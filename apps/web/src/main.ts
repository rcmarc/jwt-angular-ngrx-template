import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
} from "@angular/router";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";
import { reducers } from "./app/store";
import { provideHttpRefreshContextToken } from "./app/http.context";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(reducers),
    provideHttpRefreshContextToken(),
    provideStoreDevtools(),
  ],
}).catch((err) => console.error(err));
