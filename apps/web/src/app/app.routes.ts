import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';

import { GetUserRequestEffect, LoginRequestEffect, RefreshTokenRequestEffect } from './store/auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { httpAuthInterceptor, httpRefreshTokenInterceptor } from './interceptors';
import { canMatchIfAuthenticated, canMatchIfNotAuthenticated } from './guards/auth.guards';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import("./welcome/welcome.component"),
    canMatch: [canMatchIfAuthenticated],
    providers: [
      provideHttpClient(withInterceptors([
        httpAuthInterceptor,
        httpRefreshTokenInterceptor,
      ])),
      provideEffects(RefreshTokenRequestEffect, GetUserRequestEffect),
      AuthService
    ]
  },
  {
    path: 'auth/login',
    loadComponent: () => import("./login/login.component"),
    canMatch: [canMatchIfNotAuthenticated],
    providers: [provideEffects(LoginRequestEffect), provideHttpClient(), AuthService]
  }
];
