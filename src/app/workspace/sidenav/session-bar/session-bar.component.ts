import { Component, Input, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { slideUpDown } from '../../../core/animations/slide-up-down';
import { ClockInDialogComponent } from '../clock-in-dialog/clock-in-dialog.component';
import { SessionService } from '../../../core/services/session.service';
import { SidenavService } from '../../sidenav.service';
import { Member } from '../../../core/models/member.model';
import { TeamMember } from '../../../core/models/team-member.model';

@Component({
  selector: 'vmo-session-bar',
  templateUrl: 'session-bar.component.html',
  styleUrls: ['session-bar.component.scss'],
  animations: [slideUpDown()]
})
export class SessionBarComponent implements OnInit {
  @Input() project: Member;
  @Input() membership: Member;

  teamMembers: TeamMember[];

  constructor(private dialog: MdDialog,
              private snackbar: MdSnackBar,
              private sessionService: SessionService,
              private sidenav: SidenavService) {}

  ngOnInit(): void {
    this.teamMembers = this.membership.teamMembers.filter(teamMember => {
      return teamMember.team.projectId === this.project.id;
    });
  }

  clockIn() {
    this.sidenav.close();
    this.dialog.open(ClockInDialogComponent, <MdDialogConfig>{
      width: '400px',
      data: { teamMembers: this.teamMembers }
    });
  }

  clockOut() {
    this.sidenav.close();
    this.sessionService.clockOut(this.membership.activeSession).then(() => {
      this.snackbar.open('Clocked out', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}