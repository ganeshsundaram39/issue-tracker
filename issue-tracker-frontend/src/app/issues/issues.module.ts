import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { IssueListComponent } from './issue-list/issue-list.component'
import { MatCardModule } from '@angular/material/card';


const routes: Routes = [
  {
    path: '',
    component: IssuesComponent,
    children: [
      { path: 'new', component: NewIssueComponent },
      { path: 'list', component: IssueListComponent },
      {
        path: '',
        redirectTo: '/issues/list',
        pathMatch: 'full'
      }
    ],
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule
  ],
  declarations: [IssuesComponent, NewIssueComponent, IssueListComponent]
})
export class IssuesModule { }
