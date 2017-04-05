import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth-guard.service';
import { UserResolver } from './core/auth/user-resolver.service';
import { ProjectListComponent } from './project-list/project-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      currentUser: UserResolver,
    },
    children: [
      {
        path: 'projects',
        component: ProjectListComponent,
      },
      {
        path: 'messages',
        loadChildren: 'app/messaging/messaging.module#MessagingModule',
      },
      {
        path: 'notifications',
        loadChildren: 'app/notifications/notifications.module#NotificationsModule',
      },
      {
        path: 'projects/1',
        loadChildren: 'app/project/project.module#ProjectModule',
      },
    ]
  },
  {
    path: '',
    loadChildren: 'app/auth/auth.module#AuthModule',
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
    AuthGuard,
  ]
})

export class AppRoutingModule {}
