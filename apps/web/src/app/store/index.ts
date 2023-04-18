import { ActionReducerMap } from "@ngrx/store";

import { AuthFeature, AuthState } from "./auth";

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthFeature.reducer,
};

export interface ActionPayload<T> {
  payload: T;
}
