import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CropperDrawSettings, CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

import { AvatarService } from '../../../../core/services/avatar.service';
import { SelectedMembershipService } from '../user-profile/selected-membership.service';
import { Member } from '../../../../core/models/member.model';

@Component({
  templateUrl: 'upload-avatar.component.html',
  styleUrls: ['upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  data: any;
  cropperSettings: CropperSettings;
  member: Member;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private selectedMembership: SelectedMembershipService,
              private avatarService: AvatarService) {}

  ngOnInit() {
    this.selectedMembership.membership.subscribe(member => {
      this.member = member;
    });

    this.cropperSettings = new CropperSettings();

    this.cropperSettings.noFileInput = true;
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.width = 340;
    this.cropperSettings.height = 340;
    this.cropperSettings.canvasWidth = 640;
    this.cropperSettings.canvasHeight = 640;
    this.cropperSettings.minWidth = 340;
    this.cropperSettings.minHeight = 340;
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

  upload(data: any) {
    this.avatarService.upload(this.member.userId, data.image).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  fileChangeListener($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }
}
