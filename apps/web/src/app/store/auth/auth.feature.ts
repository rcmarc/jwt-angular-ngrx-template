import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { AuthInfo, User } from "@example/shared";

import { AuthActions } from "./auth.actions";

const initialState = getInitialState();

export const AuthFeature = createFeature({
  name: "auth",
  reducer: createReducer(
    initialState,
    on(AuthActions.loginSucccess, (state, action) => {
      return { authenticated: true, authInfo: action.payload, user: null };
    }),
    on(AuthActions.getUserSuccess, (state, action) => ({
      ...state,
      user: action.payload,
    })),
    on(AuthActions.refreshTokenSuccess, (state, action) => {
      return { ...state, authInfo: action.payload };
    }),
  ),
});

function getInitialState(): AuthState {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    return {
      user: null,
      authInfo: {
        accessToken,
        refreshToken,
      },
    };
  }

  return {
    user: null,
    authInfo: null,
  };
}

export interface AuthState {
  authInfo: AuthInfo | null;
  user: User | null;
}

export const selectAuthenticated = createSelector(
  AuthFeature.selectAuthInfo,
  (authInfo) => authInfo !== null
);
