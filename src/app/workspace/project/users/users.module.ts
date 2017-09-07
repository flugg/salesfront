import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ng2-img-cropper';

import { SharedModule } from '../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { DeleteConfirmationComponent } from './edit-user/delete-confirmation/delete-confirmation.component';
import { SendMessageDialogComponent } from './user-profile/send-message-dialog/send-message-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    UsersRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    UserProfileComponent,
    UserTabsComponent,
    InviteListComponent,
    MemberListComponent,
    InviteUserComponent,
    EditUserComponent,
    UploadAvatarComponent,
    ProfilePictureComponent,
    DeleteConfirmationComponent,
    SendMessageDialogComponent
  ],
  entryComponents: [
    ProfilePictureComponent,
    DeleteConfirmationComponent,
    SendMessageDialogComponent
  ]
})
export class UsersModule {
}
