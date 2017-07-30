import { Pipe, PipeTransform } from '@angular/core';
import { Sale } from '../../../shared/sale.model';

@Pipe({
  name: 'salesList',
  pure: false
})
export class salesListPipe implements PipeTransform {

  /**
   * Transforms a list of participations to a comma-separated conversation title.
   */
  transform(sales: Sale[]): any {
    if (sales) {
      return sales.sort(function (a, b) {
        return new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime();
      });
    }
  }
}
