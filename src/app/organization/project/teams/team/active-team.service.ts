import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../../../../core/sockets/observable-resource';
import { SocketApiService } from '../../../../core/sockets/socket-api.service';
import { TeamService } from '../team.service';
import { Team } from '../../shared/team.model';

@Injectable()
export class ActiveTeamService extends ObservableResource implements OnDestroy {

  /**
   * The observable active team.
   */
  readonly team: Observable<Team> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private teamService: TeamService) {
    super();

    this.teamService.find(this.route.snapshot.params.team).subscribe(team => this.set(team));
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}