import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationComponent } from './organization.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UnsetProjectResolver } from './project-list/unset-project-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: '',
        resolve: { project: UnsetProjectResolver },
        component: ProjectListComponent
      },
      {
        path: 'users',
        resolve: { project: UnsetProjectResolver },
        loadChildren: 'app/organization/users/users.module#UsersModule'
      },
      {
        path: 'settings',
        resolve: { project: UnsetProjectResolver },
        loadChildren: 'app/organization/settings/settings.module#SettingsModule'
      },
      {
        path: 'messages',
        loadChildren: 'app/organization/messaging/messaging.module#MessagingModule'
      },
      {
        path: 'notifications',
        loadChildren: 'app/organization/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'projects/:project',
        loadChildren: 'app/organization/project/project.module#ProjectModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
