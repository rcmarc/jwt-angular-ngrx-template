import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";

import { selectAuthenticated } from "../store/auth";

export const canMatchIfAuthenticated: CanMatchFn = (route, segments) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectAuthenticated).pipe(
    map((authenticated) => {
      return (
        authenticated || router.parseUrl(`auth/login`)
      );
    })
  );
};

export const canMatchIfNotAuthenticated: CanMatchFn = (route, segments) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectAuthenticated).pipe(
    map((authenticated) => {
      return !authenticated || router.parseUrl("");
    })
  );
};
