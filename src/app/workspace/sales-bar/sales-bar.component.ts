import { Component, Input, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/first';

import { slideUpDown } from '../../core/animations/slide-up-down';
import { SaleAddedDialogComponent } from './sale-added-dialog/sale-added-dialog.component';
import { SaleService } from '../../core/services/sale.service';
import { SalesTodayService } from './sales-today.service';
import { Member } from '../../core/models/member.model';
import { AddSaleDialogComponent } from './add-sale-dialog/add-sale-dialog.component';
import { ActiveProjectService } from '../active-project.service';
import { Project } from '../../core/models/project.model';
import { Session } from '../../core/models/session.model';

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
      if (project.type === 'count') {
        this.addSaleAndOpenSaleAddedDialog(project);
      } else {
        this.openAddSaleDialog(project);
      }
    });
  }

  private addSaleAndOpenSaleAddedDialog(project: Project) {
    this.saleService.register(this.membership.activeSession.teamMemberId).then(sale => {
      this.dialog.open(SaleAddedDialogComponent, <MdDialogConfig>{
        panelClass: 'sales-dialog',
        data: {
          sale: sale,
          count: this.valueToday,
          membership: this.membership,
          project: project
        }
      });
      this.pending = false;
    });
  }

  private openAddSaleDialog(project: Project) {
    this.dialog.open(AddSaleDialogComponent, <MdDialogConfig>{
      panelClass: 'add-sale-dialog',
      data: {
        count: this.valueToday,
        membership: this.membership,
        project: project
      }
    });
    this.pending = false;
  }
}
