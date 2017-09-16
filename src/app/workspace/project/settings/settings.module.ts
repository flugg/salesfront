import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { ProjectSettingsComponent } from './settings-tabs/project-settings/project-settings.component';
import { OrganizationSettingsComponent } from './settings-tabs/organization-settings/organization-settings.component';
import { TemplateListComponent } from './settings-tabs/contracts/template-list.component';
import { CreateTemplateComponent } from './settings-tabs/contracts/create-template/create-template.component';
import { EditTemplateComponent } from './settings-tabs/contracts/edit-template/edit-template.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsTabsComponent,
    ProjectSettingsComponent,
    OrganizationSettingsComponent,
    TemplateListComponent,
    CreateTemplateComponent,
    EditTemplateComponent
  ]
})
export class SettingsModule {}
