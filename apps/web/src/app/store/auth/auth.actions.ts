import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { AuthInfo, User, LoginCredentials } from "@example/shared"

import { ActionPayload } from "../payload";

export const AuthActions = createActionGroup({
  source: "Auth",
  events: {
    "Login Request": props<LoginRequestPayload>(),
    "Login Succcess": props<LoginSuccessPayload>(),
    "Get User Request": emptyProps(),
    "Get User Success": props<ActionPayload<User>>(),
    "Refresh Token Request": emptyProps(),
    "Refresh Token Success": props<ActionPayload<AuthInfo>>(),
  },
});

export type LoginRequestPayload = ActionPayload<LoginCredentials>;

export type LoginResponsePayload = ActionPayload<AuthInfo>;

export type LoginSuccessPayload = ActionPayload<AuthInfo>;