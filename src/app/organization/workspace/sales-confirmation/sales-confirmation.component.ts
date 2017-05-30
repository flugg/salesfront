import { Component, Inject, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar } from '@angular/material';

import { WorkspaceComponent } from '../workspace.component';
import { SaleService } from '../shared/sale.service';

@Component({
  templateUrl: 'sales-confirmation.component.html',
  styleUrls: ['sales-confirmation.component.scss'],
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
export class SalesConfirmationComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The chosen motivational cheer.
   */
  cheer: string;

  /**
   * List of available motivational cheers.
   */
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
    'Terrific!',
  ];

  /**
   * Constructs the component.
   */
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<WorkspaceComponent>,
              private snackbar: MdSnackBar,
              private saleService: SaleService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.cheer = this.getRandomCheer();
    setTimeout(() => this.loading = false, 200);
  }

  /**
   * Regrets the last sale done.
   */
  undoSale() {
    this.loading = true;
    setTimeout(() => {
      this.dialog.afterClosed().subscribe(() => {
        this.snackbar.open('Sale undone', null, { duration: 2000 });
      });
      this.dialog.close();
    }, 300);
  }

  /**
   * Adds a sale and opens the sales confirmation dialog.
   */
  addSale() {
    this.loading = true;
    this.saleService.register(this.data.membership.id).then(sale => {
      setTimeout(() => {
        this.data.sale = sale;
        this.data.count++;
        this.cheer = this.getRandomCheer();
        this.loading = false;
      }, 100);
    });
  }

  /**
   * Retrieves a random cheer from the list of cheers.
   */
  private getRandomCheer(): string {
    const cheer = this.cheers[Math.floor(Math.random() * this.cheers.length)];
    return this.cheer === cheer ? this.getRandomCheer() : cheer;
  }
}
