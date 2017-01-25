import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { LoginComponent } from "./auth/login/login.component";
import { NgModule } from "@angular/core";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects', // TODO this and all other child routes must be modular
    pathMatch: 'full'
  },
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
