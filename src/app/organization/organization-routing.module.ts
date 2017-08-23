import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: 'app',
        loadChildren: 'app/workspace/workspace.module#WorkspaceModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
