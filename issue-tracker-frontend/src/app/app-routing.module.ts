import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ValidUserGuard } from './valid-user.guard';
import { AuthenticationModule } from './authentication/authentication.module';
import { PageNotFoundModule } from './pagenotfound/pagenotfound.module';
import { IssuesModule } from './issues/issues.module';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthenticationModule,
  },
  {
    path: 'issues',
    loadChildren: () => IssuesModule,
    canActivate: [ValidUserGuard]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: '**', loadChildren: () => PageNotFoundModule }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
