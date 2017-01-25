import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { LoginComponent } from "./auth/login/login.component";
import { NgModule } from "@angular/core";

export const appRoutes: Routes = [

  {
    path: '',
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
