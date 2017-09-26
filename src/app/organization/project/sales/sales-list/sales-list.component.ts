import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Contract } from '../../../../core/models/contract.model';
import { Member } from '../../../../core/models/member.model';
import { Project } from '../../../../core/models/project.model';
import { Sale } from '../../../../core/models/sale.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { ActiveProjectService } from '../../../active-project.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DownloadContractDialogComponent } from '../download-contracts-dialog/download-contract-dialog.component';
import { ViewContractDialogComponent } from '../view-contract-dialog/view-contract-dialog.component';
import { SaleDataSource } from './sale-data-source';
import { SalesListService } from './sales-list.service';

@Component({
  providers: [SalesListService],
  templateUrl: 'sales-list.component.html'
})
export class SalesListComponent implements OnInit, OnDestroy {
  loading = true;
  sales: Sale[];
  membership: Member;
  project: Project;
  dataSource: SaleDataSource | null;
  displayedColumns = ['id'];

  private subscriptions: Subscription[] = [];

  constructor(public salesListService: SalesListService,
              private activeMembershipService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.salesListService.sales,
      this.activeMembershipService.membership,
      this.activeProjectService.project
    ).subscribe(data => {
      [this.sales, this.membership, this.project] = data;
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

  openContract(contract: Contract) {
    this.dialog.open(ViewContractDialogComponent, <MdDialogConfig>{
      data: {
        contract: contract
      }
    });
  }

  downloadContracts() {
    this.dialog.open(DownloadContractDialogComponent, <MdDialogConfig>{
      data: {
        project: this.project
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
