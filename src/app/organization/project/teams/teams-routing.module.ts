import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: 'new',
    component: CreateTeamComponent
  },
  {
    path: ':team',
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
