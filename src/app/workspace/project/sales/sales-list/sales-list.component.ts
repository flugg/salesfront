import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { SalesListService } from './sales-list.service';
import { SaleDataSource } from './sale-data-source';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { Member } from '../../../../core/models/member.model';
import { Sale } from '../../../../core/models/sale.model';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales-list.component.html'
})
export class SalesListComponent implements OnInit, OnDestroy {
  loading = true;
  sales: Sale[];
  membership: Member;
  dataSource: SaleDataSource | null;
  displayedColumns = ['id'];

  private subscriptions: Subscription[] = [];

  constructor(public salesListService: SalesListService,
              private activeMembershipService: ActiveMembershipService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.salesListService.sales,
      this.activeMembershipService.membership
    ).subscribe(data => {
      [this.sales, this.membership] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  removeSale(sale) {
    this.dialog.open(DeleteConfirmationComponent, <MdDialogConfig>{
      data: {
        sale: sale
      }
    });
  }

  canRemove(sale) {
    if (this.membership.user.isAdmin) {
      return true;
    }

    if (sale.memberId === this.membership.id) {
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