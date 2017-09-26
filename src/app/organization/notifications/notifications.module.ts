import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationSharedModule } from '../shared/organization-shared.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsModule {
}
