import { Component, OnDestroy, OnInit } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../../../core/models/product.model';
import { ProductListService } from './product-list.service';
import { Project } from '../../../../core/models/project.model';
import { ActiveProjectService } from '../../../active-project.service';
import { User } from '../../../../core/models/user.model';
import { ActiveUserService } from '../../../../organization-list/active-user.service';

@Component({
  providers: [ProductListService],
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;
  project: Project;
  products: Product[];

  private subscriptions: Subscription[] = [];

  constructor(public productListService: ProductListService,
              private activeUserService: ActiveUserService,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.productListService.products,
      this.activeUserService.user,
      this.activeProjectService.project
    ).subscribe(data => {
      [this.products, this.user, this.project] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
