import { Component, Inject, OnInit } from '@angular/core';
import { SaleService } from '../../../core/services/sale.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { SalesBarComponent } from '../sales-bar.component';
import { SaleAddedDialogComponent } from '../sale-added-dialog/sale-added-dialog.component';

@Component({
  templateUrl: 'add-sale-dialog.component.html',
  styleUrls: ['add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent implements OnInit {
  value: number;
  pending = false;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>,
              private dialogService: MdDialog,
              private saleService: SaleService) {}

  ngOnInit(): void {
    //
  }

  addSale(value: number): void {
    this.pending = true;
    this.saleService.registerWithValue(this.data.membership.activeSession.teamMemberId, value).then(sale => {
      this.dialog.close();
      this.dialogService.open(SaleAddedDialogComponent, <MdDialogConfig>{
        panelClass: 'sales-dialog',
        data: {
          sale: sale,
          count: this.data.count,
          membership: this.data.membership,
          project: this.data.project
        }
      });
      this.pending = false;
    });
  }
}
