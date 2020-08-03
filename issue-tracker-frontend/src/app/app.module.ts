import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { HttpClientModule } from "@angular/common/http"
import { ServiceWorkerModule } from "@angular/service-worker"
import { environment } from "../environments/environment"
import { MatSnackBarModule } from "@angular/material/snack-bar"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
