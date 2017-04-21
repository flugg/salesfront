import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { MembersComponent } from './members/members.component';
import { InvitesComponent } from './invites/invites.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'members',
        pathMatch: 'full'
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'invites',
        component: InvitesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
