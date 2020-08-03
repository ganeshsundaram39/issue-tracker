import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LoginComponent } from "./login/login.component"
import { RouterModule, Routes } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatTabsModule } from "@angular/material/tabs"
import { ReactiveFormsModule } from "@angular/forms"

const routes: Routes = [
  {
    path: "register",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "/auth/login",
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
})
export class AuthenticationModule {}
