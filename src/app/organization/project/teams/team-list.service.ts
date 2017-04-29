import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { TeamService } from './team.service';
import { Team } from '../shared/team.model';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private teamService: TeamService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.teamService.get(this.route.snapshot.params.id, limit, this.cursor))
        .subscribe(teams => this.add(teams));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}