import { Component, Input } from '@angular/core';

import { User } from '../../organization/shared/user.model';
import { Membership } from '../../organization/shared/membership.model';

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
   * The user to show avatar for.
   */
  @Input() membership: Membership;

  /**
   * Indicates if a session blob should be displayed.
   */
  @Input() sessionIndicator = true;

  /**
   * The base path to where the avatars are stored.
   */
  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';
}
