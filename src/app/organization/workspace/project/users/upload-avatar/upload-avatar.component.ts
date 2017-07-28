import { Component, OnInit } from '@angular/core';
import { CropperDrawSettings, CropperSettings } from 'ng2-img-cropper';
import { AvatarService } from '../shared/avatar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedMembershipService } from '../user-profile/selected-membership.service';
import { Membership } from '../../../../shared/membership.model';

@Component({
  templateUrl: 'upload-avatar.component.html',
  styleUrls: ['upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;

  /**
   * The selected membership.
   */
  membership: Membership;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private selectedMembership: SelectedMembershipService,
              private avatarService: AvatarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.selectedMembership.membership.subscribe(membership => {
      this.membership = membership;
    });

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 150;
    this.cropperSettings.height = 150;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.cropperClass = 'vmo-cropper';
    this.cropperSettings.croppingClass = 'vmo-cropper--filled';
    this.cropperSettings.cropperDrawSettings = <CropperDrawSettings>{
      strokeWidth: 2,
      strokeColor: '#2979ff',
      dragIconStrokeWidth: 0,
      dragIconStrokeColor: '#2979ff',
      dragIconFillColor: '#2979ff'
    };

    this.data = {};
  }

  /**
   * Uploads the avatar.
   */
  upload(data: any) {
    this.avatarService.upload(this.membership.userId, data.image).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
