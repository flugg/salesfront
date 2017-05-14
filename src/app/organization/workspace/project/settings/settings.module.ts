import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './settings-list/settings-list.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsListComponent
  ]
})
export class SettingsModule {}
