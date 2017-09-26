import { Component, Inject, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { SalesBarComponent } from '../sales-bar.component';

@Component({
  templateUrl: 'add-sale-dialog.component.html',
  styleUrls: ['add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent {
  value: number;
  pending = false;

  onRegister = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>) {}

  register(value: number): void {
    this.pending = true;

    this.dialog.close();
    this.onRegister.emit({ value });
  }
}
