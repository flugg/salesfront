import { Routes, RouterModule } from '@angular/router'
import { NgModule } from "@angular/core";

import { LoginComponent } from "./auth/login/login.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'users/:id',
    loadChildren: 'app/user/user.module#UserModule'
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
