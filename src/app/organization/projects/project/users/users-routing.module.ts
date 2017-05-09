import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserProfileComponent } from './user/user-profile.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'members',
        component: MemberListComponent
      },
      {
        path: 'invites',
        component: InviteListComponent,
      },
      {
        path: 'invites/send',
        component: InviteUserComponent
      }
    ]
  },
  {
    path: ':id',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
