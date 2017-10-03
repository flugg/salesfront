import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResource } from '../../../../core/observable-resource';
import { SocketApiService } from '../../../../core/socket-api.service';
import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../../../core/models/team.model';

@Injectable()
export class SelectedTeamService extends ObservableResource implements OnDestroy {
  readonly team: Observable<Team> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private teamService: TeamService) {
    super();

    this.teamService.find(this.route.snapshot.params['team']).subscribe(team => {
      this.set(team);

      this.sockets.listenForProject(team.projectId, {
        'team_updated': updatedTeam => this.updateTeam(updatedTeam),
        'team_removed': removedTeam => this.updateTeam(removedTeam),
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateTeam(team: Team) {
    if (team.id === this.route.snapshot.params['team']) {
      this.snapshot = team;

      this.updateFromSnapshot();
    }
  }
}