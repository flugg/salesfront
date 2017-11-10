import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../../../core/models/product.model';
import { Project } from '../../../../core/models/project.model';
import { ProductService } from '../../../../core/services/product.service';
import { ActiveProjectService } from '../../../active-project.service';
import { SelectedProductService } from './selected-product.service';

@Component({
  templateUrl: 'edit-product.component.html',
  providers: [SelectedProductService]
})
export class EditProductComponent implements OnInit, OnDestroy {
  pending = false;
  loading = true;
  project: Project;
  product: Product;
  name: string;
  value: number;
  active: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private selectedProductService: SelectedProductService,
              private activeProjectService: ActiveProjectService,
              private productService: ProductService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedProductService.product,
      this.activeProjectService.project
    ).subscribe(data => {
      [this.product, this.project] = data;
      this.name = this.product.name;
      this.value = this.product.value;
      this.active = !this.product.deletedAt;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit(): void {
    this.pending = true;
    const attributes = { name: this.name, value: this.value };

    if (!this.active && !this.product.deletedAt) {
      attributes['deletedAt'] = moment().toISOString();
    } else if (this.active && this.product.deletedAt) {
      attributes['deletedAt'] = null;
    }

    this.productService.update(this.product.id, attributes).then(() => {
      this.onSuccess();
    });
  }

  private onSuccess(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
    this.snackBar.open('Product updated', null, <MdSnackBarConfig>{
      duration: 2000, data: {
        product: this.product
      }
    });
    this.pending = false;
  }
}
