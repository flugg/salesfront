import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationComponent } from './organization.component';
import { SidebarResolver } from '../core/sidebar/sidebar-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    resolve: {
      sidebar: SidebarResolver
    },
    children: [
      {
        path: 'messages',
        loadChildren: 'app/organization/messaging/messaging.module#MessagingModule'
      },
      {
        path: 'notifications',
        loadChildren: 'app/organization/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'projects',
        loadChildren: 'app/organization/projects/projects.module#ProjectsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
