import { Inject, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";

import { LoginCredentials, AuthInfo, User } from "@example/shared";

import { HTTP_REFRESH_CONTEXT_TOKEN } from "../http.context";

@Injectable()
export class AuthService {
  login(credentials: LoginCredentials) {
    return this.http.post<AuthInfo>("/api/auth/login", credentials).pipe(
      tap((jwt) => saveTokens(jwt)),
    );
  }

  logout(refreshToken: string) {
    return this.http.post("/api/auth/logout", { refreshToken }).pipe(
      tap(() => {
        removeTokens();
      })
    );
  }

  getUser() {
    return this.http.get<User>("/api/user");
  }

  refreshToken() {
    return this.http
      .post<AuthInfo>(
        "/api/auth/refresh",
        {},
        { context: new HttpContext().set(this.httpRefreshContextToken, true) }
      )
      .pipe(tap((jwt) => saveTokens(jwt)));
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject(HTTP_REFRESH_CONTEXT_TOKEN)
    private httpRefreshContextToken: HttpContextToken<boolean>
  ) { }
}

function saveTokens(jwt: AuthInfo) {
  localStorage.setItem("accessToken", jwt.accessToken);
  localStorage.setItem("refreshToken", jwt.refreshToken);
}

function removeTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
