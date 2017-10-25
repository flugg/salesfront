import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DistributeBudgetDialogComponent } from '../distribute-budget-dialog/distribute-budget-dialog.component';

@Component({
  templateUrl: 'distribute-confirmation-dialog.component.html'
})
export class DistributeConfirmationDialogComponent implements OnInit {
  loading = true;

  onConfirmed = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<DistributeBudgetDialogComponent>) {}

  ngOnInit() {}

  submit() {
    this.dialog.close();
    this.onConfirmed.emit();
  }
}
