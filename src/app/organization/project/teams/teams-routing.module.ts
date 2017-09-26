import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './team-list/team-list.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { MemberListComponent } from './team-profile/member-list/member-list.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

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
            path: 'edit',
            component: EditTeamComponent
          },
          {
            path: 'update-members',
            component: EditMembersComponent,
            children: [
              {
                path: 'add',
                component: AddMemberComponent
              }
            ]
          },
          {
            path: 'members',
            component: MemberListComponent
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
