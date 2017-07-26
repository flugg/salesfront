import { Component, OnInit } from '@angular/core';

import { SalesListService } from './sales-list.service';
import { SaleDataSource } from './sale-data-source';

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
   * The table data source.
   */
  dataSource: SaleDataSource | null;
  displayedColumns = ['id'];

  /**
   * Constructs the component.
   */
  constructor(public salesList: SalesListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.dataSource = new SaleDataSource(this.salesList.sales);
    this.loading = false;
  }
}
