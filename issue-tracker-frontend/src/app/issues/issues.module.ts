import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IssuesComponent } from "./issues/issues.component"
import { RouterModule, Routes } from "@angular/router"
import { SharedModule } from "../shared/shared.module"
import { NewIssueComponent } from "./new-issue/new-issue.component"
import { IssueListComponent } from "./issue-list/issue-list.component"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { ReactiveFormsModule } from "@angular/forms"
import { AngularEditorModule } from "@kolkov/angular-editor"
import { MatButtonModule } from "@angular/material/button"

const routes: Routes = [
  {
    path: "",
    component: IssuesComponent,
    children: [
      { path: "new", component: NewIssueComponent },
      { path: "list", component: IssueListComponent },
      {
        path: "",
        redirectTo: "/issues/list",
        pathMatch: "full",
      },
    ],
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MatButtonModule,
  ],
  declarations: [IssuesComponent, NewIssueComponent, IssueListComponent],
})
export class IssuesModule {}
