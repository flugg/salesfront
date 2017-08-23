import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkspaceSharedModule } from '../shared/workspace-shared.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsModule {}
