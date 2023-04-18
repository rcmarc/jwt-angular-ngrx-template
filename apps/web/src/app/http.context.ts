import { HttpContextToken } from "@angular/common/http";
import { InjectionToken, Provider } from "@angular/core";

export const HTTP_REFRESH_CONTEXT_TOKEN = new InjectionToken<
  HttpContextToken<boolean>
>("HTTP_REFRESH_CONTEXT_CONTEXT");

export const provideHttpRefreshContextToken = (): Provider => ({
  provide: HTTP_REFRESH_CONTEXT_TOKEN,
  useValue: new HttpContextToken(() => false),
});
