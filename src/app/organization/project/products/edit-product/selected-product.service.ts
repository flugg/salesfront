import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../../../core/models/product.model';
import { ObservableResource } from '../../../../core/observable-resource';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ProductListService } from '../product-list/product-list.service';

@Injectable()
export class SelectedProductService extends ObservableResource implements OnDestroy {
  readonly product: Observable<Product> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private productListService: ProductListService) {
    super();

    this.productListService.products.map(products => products.find(product => {
      return product.id === this.route.snapshot.params['product'];
    })).subscribe(product => this.set(product));
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}