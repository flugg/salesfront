import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UserTabsComponent,
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        children: [
          {
            path: 'register',
            component: InviteUserComponent
          },
          {
            path: ':member',
            component: UserProfileComponent,
            children: [
              {
                path: 'edit',
                component: EditUserComponent
              },
              {
                path: 'upload-avatar',
                component: UploadAvatarComponent
              }
            ]
          }
        ]
      },
      {
        path: 'invites',
        component: InviteListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
