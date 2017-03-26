import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/auth/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full',
  },
  {
    path: 'messages',
    loadChildren: 'app/messaging/messaging.module#MessagingModule',
  },
  //{
  //  path: 'users/:id',
  //  loadChildren: 'app/user/user.module#UserModule',
  //},
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule {}
