import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs";


import { AuthActions } from "./auth.actions";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class LoginRequestEffect {
  loginRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action) =>
        this.auth
          .login(action.payload)
          .pipe(map((res) => AuthActions.loginSucccess({ payload: res })))
      )
    )
  );

  constructor(private actions$: Actions, private auth: AuthService) { }
}

@Injectable()
export class RefreshTokenRequestEffect {
  refreshTokenRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenRequest),
      switchMap(() =>
        this.auth
          .refreshToken()
          .pipe(map((res) => AuthActions.refreshTokenSuccess({ payload: res })))
      )
    )
  );
  constructor(private actions$: Actions, private auth: AuthService) { }
}

@Injectable()
export class GetUserRequestEffect {
  getUserRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUserRequest),
      switchMap(() =>
        this.auth
          .getUser()
          .pipe(map((res) => AuthActions.getUserSuccess({ payload: res })))
      )
    )
  );

  constructor(private actions$: Actions, private auth: AuthService) { }
}
