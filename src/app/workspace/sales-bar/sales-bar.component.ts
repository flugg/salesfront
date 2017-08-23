import { Component, Input, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { slideUpDown } from '../../core/animations/slide-up-down';
import { SaleAddedDialogComponent } from './sale-added-dialog/sale-added-dialog.component';
import { SaleService } from '../../core/services/sale.service';
import { SalesTodayService } from './sales-today.service';
import { Member } from '../../core/models/member.model';

@Component({
  selector: 'vmo-sales-bar',
  templateUrl: 'sales-bar.component.html',
  styleUrls: ['sales-bar.component.scss'],
  providers: [SalesTodayService],
  animations: [slideUpDown()]
})
export class SalesBarComponent implements OnInit {
  @Input() membership: Member;

  pending = false;
  valueToday: number;

  constructor(private dialog: MdDialog,
              private saleService: SaleService,
              private salesTodayService: SalesTodayService) {}

  ngOnInit() {
    this.salesTodayService.value.subscribe(value => {
     this.valueToday = value;
     });
  }

  addSale() {
    this.pending = true;
    this.saleService.register(this.membership.activeSession.teamMemberId).then(sale => {
      this.dialog.open(SaleAddedDialogComponent, <MdDialogConfig>{
        panelClass: 'sales-dialog',
        data: {
          sale: sale,
          count: this.valueToday,
          membership: this.membership
        }
      });
      this.pending = false;
    });
  }
}
