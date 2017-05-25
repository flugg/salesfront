import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ObservableResource } from '../../../../../../../core/sockets/observable-resource';
import { TeamListService } from '../team-list.service';
import { Team } from '../../../../shared/team.model';

@Injectable()
export class SelectedTeamService extends ObservableResource implements OnDestroy {

  /**
   * The observable active team.
   */
  readonly team: Observable<Team> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private teamList: TeamListService) {
    super();

    this.teamList.teams.map(teams => teams.filter(team => team.id === route.snapshot.params.team)[0])
      .subscribe(team => this.set(team));
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}