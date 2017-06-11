import { Component, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';
import { AvatarService } from '../shared/avatar.service';
import { ActiveUserService } from '../../../../active-user.service';
import { User } from '../../../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'upload-avatar.component.html',
  styleUrls: ['upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private activeUser: ActiveUserService,
              private avatarService: AvatarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeUser.user.subscribe(user => this.user = user);

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  /**
   * Uploads the avatar.
   */
  upload(data: any) {
    this.avatarService.upload(this.user.id, data.image).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
