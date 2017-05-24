import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { TeamService } from '../../../shared/team.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { Sale } from '../../../../shared/sale.model';
import { Team } from '../../../shared/team.model';
import { SalesListService } from '../sales-list.service';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private salesList: SalesListService,
              private teamService: TeamService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.teamService.getAll(project.id).subscribe(teams => {
        this.salesList.sales.subscribe(sales => {
          this.set(teams.map(team => {
            team.sales = sales.filter(sale => sale.teamId === team.id);
            return team;
          }));
        });
      });
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
   * Sets the observable list of resources to the current snapshot.
   */
  protected updateFromSnapshot() {
    this.snapshot.sort((a, b) => {
      if (a.sales.length > b.sales.length) {
        return -1;
      } else if (a.sales.length < b.sales.length) {
        return 1;
      } else {
        return 0;
      }
    });

    super.updateFromSnapshot();
  }

  /**
   * Adds a sale to the respecting team in the list.
   */
  private addSale(sale: Sale) {
    this.snapshot.find(team => team.id === sale.teamId).sales.push(sale);
    this.updateFromSnapshot();
  }
}
