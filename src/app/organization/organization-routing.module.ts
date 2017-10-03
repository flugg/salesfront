import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseSidenavResolver } from './close-sidenav-resolver.service';

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
        resolve: { project: UnsetProjectResolver, sidenavClosed: CloseSidenavResolver },
        component: ProjectListComponent
      },
      {
        path: 'users',
        resolve: { project: UnsetProjectResolver, sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/users/users.module#UsersModule'
      },
      {
        path: 'settings',
        resolve: { project: UnsetProjectResolver, sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/settings/settings.module#SettingsModule'
      },
      {
        path: 'messages',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/messaging/messaging.module#MessagingModule'
      },
      {
        path: 'notifications',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'projects/:project',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/project.module#ProjectModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
