import { Component, OnInit } from '@angular/core';

import { SalesListService } from './sales-list.service';
import { SaleDataSource } from './sale-data-source';
import { Sale } from '../../../shared/sale.model';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales-list.component.html'
})
export class SalesListComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * A list of sales.
   */
  sales: Sale[];

  /**
   * The table data source.
   */
  dataSource: SaleDataSource | null;
  displayedColumns = ['id'];

  /**
   * Constructs the component.
   */
  constructor(public salesList: SalesListService,
              private dialog: MdDialog) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.salesList.sales.subscribe(sales => {
      this.sales = sales;
      this.loading = false;
    });
  }

  /**
   * Removes a sale by opening a confirmation dialog.
   */
  removeSale(sale) {
    this.dialog.open(DeleteConfirmationComponent, <MdDialogConfig>{
      data: {
        sale: sale
      }
    });
  }
}
