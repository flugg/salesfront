import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { TeamService } from '../../../shared/team.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { SalesListService } from '../sales-list.service';
import { Team } from '../../../shared/team.model';

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
          teams = this.sortTeams(teams.map(team => {
            team.sales = sales.filter(sale => sale.teamId === team.id);
            return team;
          }));
          this.set(teams.map(team => {
            team.position = this.calculatePosition(teams, team);
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
   * Sorts the teams based on sales.
   */
  protected sortTeams(teams: Team[]): Team[] {
    return teams.sort((previous, current) => {
      if (previous.sales.length > current.sales.length) {
        return -1;
      } else if (previous.sales.length < current.sales.length) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /**
   * Calculates the position of the team.
   */
  private calculatePosition(teams: Team[], team: Team): number {
    const index = teams.indexOf(team);
    return teams.reduce((value, current) => {
      return teams.indexOf(current) >= index || current.sales.length === team.sales.length ? value : value + 1;
    }, 1);
  }
}
