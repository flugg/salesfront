import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

import { SaleService } from '../../../core/services/sale.service';
import { SalesBarComponent } from '../sales-bar.component';

@Component({
  templateUrl: 'add-sale-dialog.component.html',
  styleUrls: ['add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent implements OnInit {
  value: number;
  pending = false;

  onRegister = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>,
              private dialogService: MdDialog,
              private saleService: SaleService) {}

  ngOnInit(): void {
    //
  }

  register(value: number): void {
    this.pending = true;

    this.dialog.close();
    this.onRegister.emit({ value });
  }
}
