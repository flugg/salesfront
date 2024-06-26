import { Component, Input, OnChanges } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/operator/first';

import { popInOut } from '../../../core/animations/pop-in-out';
import { slideUpDown } from '../../../core/animations/slide-up-down';
import { Member } from '../../../core/models/member.model';
import { Project } from '../../../core/models/project.model';
import { TeamMember } from '../../../core/models/team-member.model';
import { SessionService } from '../../../core/services/session.service';
import { SidenavService } from '../../sidenav.service';
import { ClockInDialogComponent } from '../clock-in-dialog/clock-in-dialog.component';

@Component({
  selector: 'vmo-session-bar',
  templateUrl: 'session-bar.component.html',
  styleUrls: ['session-bar.component.scss'],
  animations: [slideUpDown(), popInOut()]
})
export class SessionBarComponent implements OnChanges {
  @Input() project: Project;
  @Input() membership: Member;

  teamMembers: TeamMember[];

  constructor(private dialog: MdDialog,
              private snackbar: MdSnackBar,
              private sessionService: SessionService,
              private sidenav: SidenavService) {}

  ngOnChanges(): void {
    this.teamMembers = !this.project ? [] : this.membership.teamMembers.filter(teamMember => {
      return teamMember.team.projectId === this.project.id;
    });
  }

  clockIn() {
    this.sidenav.closeIfOver().first().subscribe(() => {
      this.dialog.open(ClockInDialogComponent, <MdDialogConfig>{
        width: '400px',
        data: { teamMembers: this.teamMembers }
      });
    });
  }

  clockOut() {
    this.sidenav.close();
    this.sessionService.clockOut(this.membership.activeSession).then(() => {
      this.snackbar.open('Clocked out', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}