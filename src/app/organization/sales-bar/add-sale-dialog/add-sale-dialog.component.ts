import { Component, Inject, EventEmitter, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { SalesBarComponent } from '../sales-bar.component';
import { Product } from '../../../core/models/product.model';

@Component({
  templateUrl: 'add-sale-dialog.component.html',
  styleUrls: ['add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent implements OnInit {
  pending = false;
  loading = true;
  value: number;
  selectedProduct: string;
  products: Product[];

  onRegister = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>) {}

  ngOnInit() {
    if (this.data.project.products && this.data.project.products.length) {
      this.selectedProduct = this.data.project.products[0].id;
    }

    this.products = this.data.project.products.filter(product => !product.deletedAt);
    this.loading = false;
  }

  register(value: number): void {
    this.pending = true;

    this.dialog.close();
    this.onRegister.emit({ value, product: this.selectedProduct });
  }
}
