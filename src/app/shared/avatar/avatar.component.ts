import { Component, Input, OnInit } from '@angular/core';

import { Member } from '../../core/models/member.model';
import { Project } from '../../core/models/project.model';
import { ActiveProjectService } from '../../workspace/active-project.service';

@Component({
  selector: 'vmo-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() membership: Member;
  @Input() sessionIndicator = true;

  loading = true;
  project: Project;
  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';

  constructor(private activeProjectService: ActiveProjectService) {}

  ngOnInit(): void {
    this.activeProjectService.project.subscribe(project => {
      this.project = project;
      this.loading = false;
    });
  }

  isClockedIn(): boolean {
    if (Array.isArray(this.membership.activeSession)) {
      this.membership.activeSession = null;
    }

    return !!this.membership.activeSession;
  }
}
