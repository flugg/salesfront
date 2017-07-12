import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { WorkspaceComponent } from '../workspace.component';
import { SessionService } from '../../shared/session.service';

@Component({
  templateUrl: 'clock-in-confirmation.component.html'
})
export class ClockInConfirmationComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The id of the selected team member to add sale for.
   */
  selectedTeamMember: string;

  /**
   * Indicates if it should clock out automatically.
   */
  clockOut: boolean;

  /**
   * The time input value.
   */
  time: string;

  /**
   * Constructs the component.
   */
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<WorkspaceComponent>,
              private sessionService: SessionService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.selectedTeamMember = this.data.teamMembers[0].id;
    this.time = moment().add(8, 'hours').startOf('hour').format('HH:mm');
  }

  /**
   * Clocks the user in and starts a new session.
   */
  clockIn() {
    this.sessionService.clockIn(this.selectedTeamMember).then(() => {
      this.dialog.close();
    });
  }
}
