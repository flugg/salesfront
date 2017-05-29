import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { ProjectSettingsComponent } from './settings-tabs/project-settings/project-settings.component';
import { OrganizationSettingsComponent } from './settings-tabs/organization-settings/organization-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SettingsTabsComponent,
    children: [
      {
        path: 'project',
        component: ProjectSettingsComponent,
      },
      {
        path: 'organization',
        component: OrganizationSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
