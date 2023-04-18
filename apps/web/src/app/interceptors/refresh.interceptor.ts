import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, first, of, switchMap, throwError } from "rxjs";
import { Store } from "@ngrx/store";

import {
  AuthActions,
  AuthFeature,
} from "../store/auth";

import { AuthInfo } from "@example/shared";

export const httpRefreshTokenInterceptor: HttpInterceptorFn = function (
  req,
  next
) {
  const store = inject(Store);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return of(store.dispatch(AuthActions.refreshTokenRequest())).pipe(

          // Select the tokens and check for type narrowing
          switchMap(() => store.select(AuthFeature.selectAuthInfo)),
          switchMap((info) => {
            if (info === null) return throwError(() => err);
            return of(info as AuthInfo);
          }),

          // only emits when the store has the new accessToken
          first(
            (info) =>
              info.accessToken !==
              req.headers.get("authorization")?.split(" ")[1]
          ),

          switchMap((info) => {
            return next(
              req.clone({
                headers: req.headers.set(
                  "Authorization",
                  `Bearer ${info.accessToken}`
                ),
              })
            );
          })
        );
      }
      return of(err);
    })
  );
};
