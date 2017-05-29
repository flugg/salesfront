import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { ProjectSettingsComponent } from './settings-tabs/project-settings/project-settings.component';
import { OrganizationSettingsComponent } from './settings-tabs/organization-settings/organization-settings.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsTabsComponent,
    ProjectSettingsComponent,
    OrganizationSettingsComponent
  ]
})
export class SettingsModule {}
