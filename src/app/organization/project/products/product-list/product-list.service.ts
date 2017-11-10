import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Product } from '../../../../core/models/product.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';

@Injectable()
export class ProductListService extends ObservableResourceList implements OnDestroy {
  readonly products: Observable<Product[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeProjectService: ActiveProjectService) {
    super();

    this.activeProjectService.project.first().subscribe(project => {
      this.set(project.products);

      this.sockets.listenForProject(project.id, {
        'product_created': product => this.addProduct(product),
        'product_updated': product => this.updateProduct(product),
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addProduct(product: Product) {
    this.snapshot.push(product);
    this.updateFromSnapshot();
  }

  private updateProduct(product: Product) {
    for (const key in this.snapshot) {
      if (this.snapshot[key].id === product.id) {
        this.snapshot[key] = product;
      }
    }

    this.updateFromSnapshot();
  }
}