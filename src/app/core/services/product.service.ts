import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product.model';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class ProductService {
  constructor(private api: RestApiService) {}

  list(projectId: string): Observable<Product[]> {
    return this.api.get(`projects/${projectId}/products`).map(response => response.data);
  }

  create(projectId: string, attributes: any): Promise<Product> {
    return this.api.post(`projects/${projectId}/products`, attributes).then(response => response.data);
  }

  find(productId: string): Observable<Product> {
    return this.api.get(`products/${productId}`).map(response => response.data);
  }

  update(productId: string, attributes: any) {
    return this.api.put(`products/${productId}`, attributes).then(response => response.data);
  }

  delete(productId: string) {
    return this.api.delete(`produts/${productId}`).then(response => response.data);
  }
}
