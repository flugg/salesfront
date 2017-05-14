import { Component, OnInit } from '@angular/core';

import { SalesListService } from './sales-list.service';
import { Sale } from '../../../shared/sale.model';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales-list.component.html'
})
export class SalesListComponent implements OnInit {

  selectAll = false;

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded membersips.
   */
  sales: Sale[];

  /**
   * Constructs the component.
   */
  constructor(public salesList: SalesListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.salesList.sales.subscribe(sales => {
      this.sales = sales;
      this.loading = false;
    });
  }
}
