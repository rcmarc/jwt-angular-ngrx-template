import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, mergeMap, take } from "rxjs";
import { Store } from "@ngrx/store";

import { HTTP_REFRESH_CONTEXT_TOKEN } from "../http.context";
import { AuthFeature } from "../store/auth";

export const httpAuthInterceptor: HttpInterceptorFn = function (req, next) {
  const store = inject(Store);
  const httpRefreshContextToken = inject(HTTP_REFRESH_CONTEXT_TOKEN);
  const needsRefresh = req.context.get(httpRefreshContextToken);

  return store.select(AuthFeature.selectAuthState).pipe(
    // only once, otherwise it will hit a request every time the state changes
    take(1),
    map((state) => {
      // Don't add the header if it isn't authenticated
      if (!state.authInfo) {
        return req;
      }
      return req.clone({
        headers: req.headers.set(
          "Authorization",
          `Bearer ${
            needsRefresh
              ? state.authInfo.refreshToken
              : state.authInfo.accessToken
          }`
        ),
      });
    }),
    mergeMap((authReq) => next(authReq))
  );
};
