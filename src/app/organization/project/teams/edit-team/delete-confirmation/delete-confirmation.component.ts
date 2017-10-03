import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { EditTeamComponent } from '../edit-team.component';
import { TeamService } from '../../../../../core/services/team.service';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  loading = true;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<EditTeamComponent>,
              private snackBar: MdSnackBar,
              private teamService: TeamService) {}

  ngOnInit() {}

  removeTeam() {
    this.teamService.delete(this.data.team.id).then(team => {
      this.snackBar.open('Team removed', null, <MdSnackBarConfig>{ duration: 4000 });

      this.dialog.close();
    });
  }
}
