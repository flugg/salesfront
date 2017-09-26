import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar } from '@angular/material';

import { EditTeamComponent } from '../edit-team.component';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  loading = true;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<EditTeamComponent>,
              private snackBar: MdSnackBar) {}

  ngOnInit() {}

  removeUser() {
    this.dialog.close();
  }
}
