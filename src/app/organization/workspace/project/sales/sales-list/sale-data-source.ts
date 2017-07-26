import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';

import { Sale } from '../../../shared/sale.model';

export class SaleDataSource extends DataSource<any> {

  constructor(private sales: Observable<Sale[]>) {
    super();
  }

  connect(): Observable<Sale[]> {
    return this.sales;
  }

  disconnect() {}
}