import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contract } from '../../../../core/models/contract.model';
import { Sale } from '../../../../core/models/sale.model';
import { Session } from '../../../../core/models/session.model';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { SaleService } from '../../../../core/services/sale.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';

@Injectable()
export class SalesListService extends ObservableResourceList implements OnDestroy {
  readonly sales: Observable<Sale[]> = this.subject.asObservable();

  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private salesService: SaleService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.salesService.getAll(project.id, limit, this.cursor))
          .subscribe(sales => this.add(sales));
      });

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale),
        'contract_registered': contract => this.addContract(contract),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  protected updateFromSnapshot() {
    this.snapshot = this.sort(this.snapshot);
    super.updateFromSnapshot();
  }

  protected sort(teams: Sale[]): Sale[] {
    return teams.sort((previous, current) => {
      if (previous.soldAt === current.soldAt) {
        if (previous.registeredAt > current.registeredAt) {
          return -1;
        } else if (previous.registeredAt < current.registeredAt) {
          return 1;
        } else {
          return 0;
        }
      }

      if (previous.soldAt > current.soldAt) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  private addSale(sale: Sale) {
    this.snapshot.push(sale);
    this.updateFromSnapshot();
  }

  private removeSale(sale: Sale) {
    this.snapshot = this.snapshot.filter(item => item.id !== sale.id);
    this.updateFromSnapshot();
  }

  private addContract(contract: Contract) {
    this.snapshot = this.snapshot.map(item => {
      if (item.id === contract.saleId) {
        return { ...item, contract: contract };
      }

      return item;
    });

    this.updateFromSnapshot();
  }

  private setActiveSession(session: Session) {
    this.snapshot.map(sale => {
      if (sale.memberId === session.memberId) {
        sale.member.activeSession = session;
      }

      return sale;
    });

    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {
    this.snapshot.map(sale => {
      if (sale.memberId === session.memberId) {
        sale.member.activeSession = null;
      }

      return sale;
    });

    this.updateFromSnapshot();
  }
}
