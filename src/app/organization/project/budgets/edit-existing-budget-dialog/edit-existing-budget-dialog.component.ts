import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { AddBudgetComponent } from '../add-budget/add-budget.component';

@Component({
  templateUrl: 'edit-existing-budget-dialog.component.html'
})
export class EditExistingBudgetDialogComponent implements OnInit {
  loading = true;

  onConfirmed = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<AddBudgetComponent>) {}

  ngOnInit() {}

  submit() {
    this.dialog.close();
    this.onConfirmed.emit();
  }
}
