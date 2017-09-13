import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../core/models/project.model';
import { Sale } from '../../core/models/sale.model';

import { ObservableResource } from '../../core/observable-resource';
import { SaleService } from '../../core/services/sale.service';
import { SocketApiService } from '../../core/socket-api.service';
import { ActiveMembershipService } from '../../organization/active-membership.service';
import { ActiveProjectService } from '../active-project.service';

@Injectable()
export class SalesTodayService extends ObservableResource implements OnDestroy {
  readonly value: Observable<number> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private saleService: SaleService,
              private activeProjectService: ActiveProjectService,
              private activeMembershipService: ActiveMembershipService) {
    super();

    this.activeProjectService.project.first().subscribe(project => {
      this.activeMembershipService.membership.first().subscribe(membership => {
        this.saleService.getForMember(membership.id, moment().startOf('day'), moment().endOf('day')).map(sales => {
          return sales.filter(sale => sale.projectId === project.id);
        }).subscribe(sales => {
          this.set(sales.reduce((value, item) => {
            return item.value ? value + item.value : value + 1;
          }, 0));
        });

        this.sockets.listenForUser(membership.userId, {
          'sale_registered': sale => this.addSale(sale, project),
          'sale_deleted': sale => this.removeSale(sale, project)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addSale(sale: Sale, project: Project) {
    if (sale.projectId === project.id) {
      if (sale.value) {
        this.snapshot = this.snapshot + sale.value;
      } else {
        this.snapshot = this.snapshot + 1;
      }
      this.updateFromSnapshot();
    }
  }

  private removeSale(sale: Sale, project: Project) {
    if (sale.projectId === project.id) {
      if (sale.value) {
        this.snapshot = this.snapshot - sale.value;
      } else {
        this.snapshot = this.snapshot - 1;
      }
      this.updateFromSnapshot();
    }
  }
}