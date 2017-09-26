import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Team } from '../../../../../../core/models/team.model';
import { ObservableResource } from '../../../../../../core/observable-resource';
import { TeamListService } from '../team-list.service';

@Injectable()
export class SelectedTeamService extends ObservableResource implements OnDestroy {
  readonly team: Observable<Team> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private teamList: TeamListService) {
    super();

    this.teamList.teams.map(teams => teams.filter(team => team.id === route.snapshot.params['team'])[0])
      .subscribe(team => this.set(team));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}