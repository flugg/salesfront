import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as moment from 'moment';

import { SaleService } from '../../../../core/services/sale.service';
import { SalesListComponent } from '../sales-list/sales-list.component';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  loading = true;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesListComponent>,
              private snackBar: MdSnackBar,
              private saleService: SaleService) {}

  ngOnInit() {}

  removeSale() {
    this.saleService.delete(this.data.sale.id).then(() => {
      this.snackBar.open('Sale deleted', 'Undo', <MdSnackBarConfig>{ duration: 4000 }).onAction().subscribe(() => {
        this.saleService.register(this.data.sale.teamMemberId, moment(this.data.sale.soldAt)).then(() => {
          this.snackBar.open('Sale recovered', null, <MdSnackBarConfig>{ duration: 2000 });
        });
      });

      this.dialog.close();
    });
  }
}
