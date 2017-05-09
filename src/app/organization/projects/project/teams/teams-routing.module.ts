import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './team-list/team-list.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: 'new',
        component: CreateTeamComponent
      },
      {
        path: ':team',
        component: TeamProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
