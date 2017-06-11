import { Component, Input } from '@angular/core';

import { User } from '../../organization/shared/user.model';

@Component({
  selector: 'vmo-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss']
})
export class AvatarComponent {

  /**
   * The user to show avatar for.
   */
  @Input() user: User;

  /**
   * The base path to where the avatars are stored.
   */
  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';
}
