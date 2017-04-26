import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: ':id',
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
