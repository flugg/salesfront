import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Sale } from '../../../core/models/sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { SalesBarComponent } from '../sales-bar.component';

@Component({
  templateUrl: 'sale-added-dialog.component.html',
  styleUrls: ['sale-added-dialog.component.scss'],
  animations: [
    trigger('popInOut', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('360ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate('120ms cubic-bezier(0.4, 0.0, 0.6, 1)', style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class SaleAddedDialogComponent implements OnInit {
  loading = true;
  cheer: string;
  previousSale: Sale;
  cheers = [
    'Great job!',
    'Nice one!',
    'Wow!',
    'Brilliant!',
    'Excellent!',
    'Amazing!',
    'Exceptional!',
    'Incredible!',
    'Superb work!',
    'Awesome!',
    'Magnificent!',
    'Well done!',
    'Sweet!',
    'Smooth!',
    'Go! Go! Go!',
    'Keep it up!',
    'You know it!',
    'Outstanding!',
    'Bravo!',
    'Huzzah!',
    'Bingo!',
    'Spot on!',
    'You rock!',
    'You rule!',
    'Swell!',
    'Gooooooaaal!',
    'Strike!',
    'Hole in one!',
    'Success!',
    'Fantastic!',
    'Lovely!',
    'Remarkable!',
    'Spectacular!',
    'Beautiful!',
    'Wonderful!',
    'Glorious!',
    'Splendid!',
    'Tremendous!',
    'Phenomonal!',
    'Sensational!',
    'Grand!',
    'Top-notch!',
    'Impressive!',
    'Terrific!'
  ];

  onRegisterNewSale = new EventEmitter();
  onRegisterNewContract = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>,
              private dialogService: MdDialog,
              private snackbar: MdSnackBar,
              private saleService: SaleService) {}

  ngOnInit() {
    this.previousSale = this.data.sale;
    this.cheer = this.getRandomCheer();
    setTimeout(() => this.loading = false, 200);
  }

  undoSale() {
    this.loading = true;
    this.saleService.delete(this.previousSale.id).then(() => {
      this.dialog.afterClosed().subscribe(() => {
        this.snackbar.open('Deal undone', null, <MdSnackBarConfig>{ duration: 2000 });
      });
      this.dialog.close();
    });
  }

  addSale() {
    this.loading = true;

    if (this.data.project.contractTemplate) {
      this.dialog.close();
      this.onRegisterNewContract.emit();
    } else if (this.data.project.type !== 'count') {
      this.dialog.close();
      this.onRegisterNewSale.emit();
    } else {
      this.saleService.register(this.data.membership.activeSession.teamMemberId).then(sale => {
        this.previousSale = sale;
        setTimeout(() => {
          this.data.sale = sale;
          this.data.count++;
          this.cheer = this.getRandomCheer();
          this.loading = false;
        }, 100);
      });
    }
  }

  private getRandomCheer(): string {
    const cheer = this.cheers[Math.floor(Math.random() * this.cheers.length)];
    return this.cheer === cheer ? this.getRandomCheer() : cheer;
  }
}
