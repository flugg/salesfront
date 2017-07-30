import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as moment from 'moment';

import { WorkspaceComponent } from '../../../workspace.component';
import { SaleService } from '../../../shared/sale.service';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Constructs the component.
   */
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<WorkspaceComponent>,
              private snackBar: MdSnackBar,
              private saleService: SaleService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {}

  /**
   * Removes a sale and closes the dialog.
   */
  removeSale() {
    this.saleService.delete(this.data.sale.id).then(() => {
      this.snackBar.open('Sale removed', 'Undo', <MdSnackBarConfig>{ duration: 3000 }).onAction().subscribe(() => {
        this.saleService.register(this.data.sale.teamMemberId, moment(this.data.sale.soldAt)).then(() => {
          this.snackBar.open('Sale recovered', null, <MdSnackBarConfig>{ duration: 2000 });
        });
      });

      this.dialog.close();
    });
  }
}
