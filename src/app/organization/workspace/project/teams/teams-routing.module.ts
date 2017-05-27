import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './team-list/team-list.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { MemberListComponent } from './team-profile/member-list/member-list.component';
import { LeaderListComponent } from './team-profile/leader-list/leader-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent,
    children: [
      {
        path: 'new',
        component: CreateTeamComponent
      },
      {
        path: ':team',
        component: TeamProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'members',
            pathMatch: 'full'
          },
          {
            path: 'members',
            component: MemberListComponent
          },
          {
            path: 'leaders',
            component: LeaderListComponent
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
export class TeamsRoutingModule {}
