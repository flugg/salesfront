import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  templateUrl: 'profile-picture.component.html',
  styleUrls: ['profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              private router: Router,
              public dialog: MdDialogRef<UserProfileComponent>) {}

  ngOnInit(): void {
    //
  }

  updatePicture(): void {
    this.dialog.close();
    this.router.navigate(['upload-avatar'], { relativeTo: this.data.route });
  }
}
