import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Sale } from '../../../../../core/models/sale.model';
import { Team } from '../../../../../core/models/team.model';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { LeaderboardService } from '../../../../../core/services/leaderboard.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { DatepickerService } from '../../../../shared/datepicker/datepicker.service';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private leaderboardService: LeaderboardService,
              private datepicker: DatepickerService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.datepicker.range.distinctUntilChanged().subscribe(range => {
        const [after, before] = range;
        this.leaderboardService.teams(project.id, moment(after).startOf('day'), moment(before).endOf('day')).subscribe(teams => {
          this.set(teams.map(team => {
            team.position = this.calculatePosition(teams, team);
            return team;
          }));
        });
      });

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale)
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

  protected sort(teams: Team[]): Team[] {
    return teams.sort((previous, current) => {
      if (previous.value > current.value) {
        return -1;
      } else if (previous.value < current.value) {
        return 1;
      } else {
        return previous.name > current.name ? 1 : -1;
      }
    });
  }

  private calculatePosition(teams: Team[], team: Team): number {
    const index = teams.indexOf(team);
    return teams.reduce((value, current) => {
      return teams.indexOf(current) >= index || current.value === team.value ? value : value + 1;
    }, 1);
  }

  private addSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.teamId);

    if (membership) {
      if (sale.value) {
        membership.value += sale.value;
      } else {
        membership.value += 1;
      }
      this.updateFromSnapshot();
    }
  }

  private removeSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.teamId);

    if (membership) {
      if (sale.value) {
        membership.value -= sale.value;
      } else {
        membership.value -= 1;
      }
      this.updateFromSnapshot();
    }
  }
}
