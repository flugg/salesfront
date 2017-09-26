import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationSharedModule } from '../shared/organization-shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { CreateTemplateComponent } from './settings-tabs/contracts/create-template/create-template.component';
import { EditTemplateComponent } from './settings-tabs/contracts/edit-template/edit-template.component';
import { TemplateListComponent } from './settings-tabs/contracts/template-list.component';
import { OrganizationSettingsComponent } from './settings-tabs/organization-settings/organization-settings.component';
import { OrganizationComponent } from './settings-tabs/organization/organization.component';
import { ProjectSettingsComponent } from './settings-tabs/project-settings/project-settings.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    CreateTemplateComponent,
    EditTemplateComponent,
    OrganizationSettingsComponent,
    ProjectSettingsComponent,
    SettingsTabsComponent,
    TemplateListComponent,
    OrganizationComponent
  ]
})
export class SettingsModule {
}
