import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/guards/auth-guard.service';
import { UserResolver } from './core/auth/user-resolver.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      currentUser: UserResolver
    },
    children: [
      {
        path: 'messages',
        loadChildren: 'app/user/messaging/messaging.module#MessagingModule'
      },
      {
        path: 'notifications',
        loadChildren: 'app/user/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'projects',
        loadChildren: 'app/organization/organization.module#OrganizationModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
