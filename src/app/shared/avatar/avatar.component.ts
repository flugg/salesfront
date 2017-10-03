import { Component, Input } from '@angular/core';

import { popInOut } from '../../core/animations/pop-in-out';
import { Member } from '../../core/models/member.model';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'vmo-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
  animations: [popInOut()]
})
export class AvatarComponent {
  @Input() membership: Member;
  @Input() project: Project;
  @Input() sessionIndicator = true;

  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';

  isClockedIn(): boolean {
    if (Array.isArray(this.membership.activeSession)) {
      this.membership.activeSession = null;
    }

    return !!this.membership.activeSession;
  }
}
