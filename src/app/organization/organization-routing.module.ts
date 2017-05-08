import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
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
