import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTemplateComponent } from './settings-tabs/contracts/create-template/create-template.component';
import { TemplateListComponent } from './settings-tabs/contracts/template-list.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { EditTemplateComponent } from './settings-tabs/contracts/edit-template/edit-template.component';
import { OrganizationComponent } from './settings-tabs/organization/organization.component';
import { SpectatorListComponent } from './settings-tabs/spectators/spectator-list.component';
import { InviteSpectatorComponent } from './settings-tabs/spectators/invite-spectator/invite-spectator.component';
import { EditSpectatorComponent } from './settings-tabs/spectators/edit-spectator/edit-spectator.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabsComponent,
    children: [
      {
        path: 'organization',
        component: OrganizationComponent
      },
      {
        path: 'contracts',
        component: TemplateListComponent,
        children: [
          {
            path: 'new',
            component: CreateTemplateComponent
          },
          {
            path: ':template',
            component: EditTemplateComponent
          }
        ]
      },
      {
        path: 'spectators',
        component: SpectatorListComponent,
        children: [
          {
            path: 'new',
            component: InviteSpectatorComponent
          },
          {
            path: ':spectator',
            component: EditSpectatorComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
