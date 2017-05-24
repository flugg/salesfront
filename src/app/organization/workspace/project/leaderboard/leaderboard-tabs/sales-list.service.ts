import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import * as moment from 'moment';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { SaleService } from '../../../shared/sale.service';
import { Sale } from '../../../shared/sale.model';

@Injectable()
export class SalesListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly sales: Observable<Sale[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private saleService: SaleService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.saleService.getForProject(project.id, moment().startOf('day'), moment()).subscribe(sales => this.add(sales));

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale)
      }, this);
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Adds a sale to the list.
   */
  private addSale(sale: Sale) {
    this.snapshot.push(sale);
    this.updateFromSnapshot();
  }
}
