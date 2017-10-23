import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Team } from '../../../../../../../core/models/team.model';
import { ObservableResource } from '../../../../../../../core/observable-resource';
import { TeamService } from '../../../../../../../core/services/team.service';

@Injectable()
export class SelectedTeamService extends ObservableResource implements OnDestroy {
  readonly team: Observable<Team> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private teamService: TeamService) {
    super();

    this.teamService.find(route.snapshot.params['team']).subscribe(team => this.set(team));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}