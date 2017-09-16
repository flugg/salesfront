import { Component, Input, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/first';

import { slideUpDown } from '../../core/animations/slide-up-down';
import { Member } from '../../core/models/member.model';
import { Project } from '../../core/models/project.model';
import { Sale } from '../../core/models/sale.model';
import { Session } from '../../core/models/session.model';
import { SaleService } from '../../core/services/sale.service';
import { ActiveProjectService } from '../active-project.service';
import { AddSaleDialogComponent } from './add-sale-dialog/add-sale-dialog.component';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { SaleAddedDialogComponent } from './sale-added-dialog/sale-added-dialog.component';
import { SalesTodayService } from './sales-today.service';

@Component({
  selector: 'vmo-sales-bar',
  templateUrl: 'sales-bar.component.html',
  styleUrls: ['sales-bar.component.scss'],
  providers: [SalesTodayService],
  animations: [slideUpDown()]
})
export class SalesBarComponent implements OnInit {
  @Input() membership: Member;
  @Input() project: Project;

  loading = true;
  pending = false;
  valueToday: number;
  session: Session;

  constructor(private dialog: MdDialog,
              private saleService: SaleService,
              private activeProjectService: ActiveProjectService,
              private salesTodayService: SalesTodayService) {}

  ngOnInit() {
    this.salesTodayService.value.subscribe(value => {
      this.valueToday = value;
      this.loading = false;
    });
  }

  addSale() {
    this.pending = true;

    this.activeProjectService.project.first().subscribe(project => {
      if (project.type === 'count' && !project.contractTemplate) {
        this.saleService.register(this.membership.activeSession.teamMemberId).then(sale => {
          this.openSaleAddedDialog(sale, project);
          this.pending = false;
        });
      } else if (project.type === 'value') {
        this.openAddSaleDialog(project);
      } else if (project.contractTemplate) {
        this.openContractDialog(project);
      }
    });
  }

  private addSaleWithValue(project: Project, value: number): void {
    this.saleService.registerWithValue(this.membership.activeSession.teamMemberId, value).then(sale => {
      this.openSaleAddedDialog(sale, project);
      this.pending = false;
    });
  }

  private addSaleWithContract(project: Project, fields: any, signature?: string): void {
    this.saleService.registerWithContract(this.membership.activeSession.teamMemberId, fields, signature).then(sale => {
      this.openSaleAddedDialog(sale, project);
      this.pending = false;
    });
  }

  private addSaleWithValueAndContract(project: Project, value: number, fields: any, signature?: string): void {
    this.saleService.registerWithValueAndContract(this.membership.activeSession.teamMemberId, fields, value, signature).then(sale => {
      this.openSaleAddedDialog(sale, project);
      this.pending = false;
    });
  }

  private openAddSaleDialog(project: Project) {
    const dialog = this.dialog.open(AddSaleDialogComponent, <MdDialogConfig>{
      panelClass: 'add-sale-dialog',
      data: {
        count: this.valueToday,
        membership: this.membership,
        project: project
      }
    });

    dialog.componentInstance.onRegister.subscribe(data => {
      dialog.afterClosed().subscribe(() => {
        if (project.contractTemplate) {
          this.openContractDialog(project, data.value);
        } else {
          this.addSaleWithValue(project, data.value);
        }
      });
    });

    this.pending = false;
  }

  private openContractDialog(project: Project, value?: number) {
    const dialog = this.dialog.open(ContractDialogComponent, <MdDialogConfig>{
      panelClass: 'contract-dialog',
      data: {
        count: this.valueToday,
        membership: this.membership,
        project: project,
        value: value
      }
    });

    dialog.componentInstance.onRegister.subscribe(data => {
      dialog.afterClosed().subscribe(() => {
        if (data.value) {
          this.addSaleWithValueAndContract(project, data.value, data.contract, data.signature);
        } else {
          this.addSaleWithContract(project, data.contract, data.signature);
        }
      });
    });

    this.pending = false;
  }

  private openSaleAddedDialog(sale: Sale, project: Project) {
    const dialog = this.dialog.open(SaleAddedDialogComponent, <MdDialogConfig>{
      panelClass: 'sales-dialog',
      data: {
        sale: sale,
        count: this.valueToday,
        membership: this.membership,
        project: project
      }
    });

    dialog.componentInstance.onRegisterNewContract.subscribe(() => {
      dialog.afterClosed().subscribe(() => this.openContractDialog(project));
    });

    dialog.componentInstance.onRegisterNewSale.subscribe(() => {
      dialog.afterClosed().subscribe(() => this.openAddSaleDialog(project));
    });
  }
}
