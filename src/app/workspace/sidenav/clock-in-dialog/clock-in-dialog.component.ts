import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { SessionBarComponent } from '../session-bar/session-bar.component';
import { SessionService } from '../../../core/services/session.service';

@Component({
  templateUrl: 'clock-in-dialog.component.html',
  styleUrls: ['clock-in-dialog.component.scss']
})
export class ClockInDialogComponent implements OnInit {
  loading = true;
  autoClockOut = false;
  clockOutTime: string;
  selectedTeamMember: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SessionBarComponent>,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.selectedTeamMember = this.data.teamMembers[0].id;
    this.clockOutTime = moment().add(8, 'hours').startOf('hour').format('HH:mm');
  }

  clockIn() {
    this.sessionService.clockIn(this.selectedTeamMember).then(() => {
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialog.close();
  }
}
