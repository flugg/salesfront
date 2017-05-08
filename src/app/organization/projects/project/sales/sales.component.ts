import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SalesListService } from './sales-list.service';
import { Sale } from '../../../shared/sale.model';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales.component.html'
})
export class SalesComponent implements OnInit, OnDestroy {

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
   * List of selectAll observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public salesList: SalesListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.salesList.sales.subscribe(sales => {
      this.sales = sales;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
