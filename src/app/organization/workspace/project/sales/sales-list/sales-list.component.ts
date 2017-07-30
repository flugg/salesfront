import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SalesListService } from './sales-list.service';
import { SaleDataSource } from './sale-data-source';
import { Sale } from '../../../shared/sale.model';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ActiveMembershipService } from '../../../active-membership.service';
import { Membership } from '../../../../shared/membership.model';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales-list.component.html'
})
export class SalesListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * A list of sales.
   */
  sales: Sale[];


  /**
   * The active membership.
   */
  membership: Membership;

  /**
   * The table data source.
   */
  dataSource: SaleDataSource | null;
  displayedColumns = ['id'];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public salesList: SalesListService,
              private activeMembership: ActiveMembershipService,
              private dialog: MdDialog) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembership.membership,
      this.salesList.sales
    ).subscribe(data => {
      [this.membership, this.sales] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  /**
   * Indicates if you can remove a sale.
   */
  canRemove(sale) {
    if (sale.membership.user.isAdmin) {
      return true;
    }

    for (const teamMember of this.membership.teamMembers) {
      if (teamMember.teamId === sale.teamId && teamMember.isLeader) {
        return true;
      }
    }

    return false;
  }
}
