import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoAuthGuard } from '../core/auth/no-auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    NoAuthGuard
  ]
})
export class AuthRoutingModule {}
