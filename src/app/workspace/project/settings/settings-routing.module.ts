import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTemplateComponent } from './settings-tabs/contracts/create-template/create-template.component';
import { TemplateListComponent } from './settings-tabs/contracts/template-list.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { EditTemplateComponent } from './settings-tabs/contracts/edit-template/edit-template.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabsComponent,
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
