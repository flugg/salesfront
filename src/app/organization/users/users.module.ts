import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ng2-img-cropper';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationSharedModule } from '../shared/organization-shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { DeleteConfirmationComponent } from './edit-user/delete-confirmation/delete-confirmation.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { SendMessageDialogComponent } from './user-profile/send-message-dialog/send-message-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    UsersRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    EditUserComponent,
    DeleteConfirmationComponent,
    InviteListComponent,
    InviteUserComponent,
    MemberListComponent,
    ProfilePictureComponent,
    SendMessageDialogComponent,
    UploadAvatarComponent,
    UserProfileComponent,
    UserTabsComponent
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    ProfilePictureComponent,
    SendMessageDialogComponent
  ]
})
export class UsersModule {}
