import { DataSource } from '@angular/cdk/typings/collections';
import { Observable } from 'rxjs/Observable';

import { Sale } from '../../../../core/models/sale.model';

export class SaleDataSource extends DataSource<any> {

  constructor(private sales: Observable<Sale[]>) {
    super();
  }

  connect(): Observable<Sale[]> {
    return this.sales;
  }

  disconnect() {}
}