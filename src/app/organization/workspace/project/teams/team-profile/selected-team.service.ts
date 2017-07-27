import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResource } from '../../../../../core/sockets/observable-resource';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { ActiveProjectService } from '../../../shared/active-project.service';

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
              private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private teamService: TeamService) {
    super();

    this.teamService.find(this.route.snapshot.params['team']).subscribe(team => this.set(team));

    this.activeProject.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'team_updated': team => this.updateTeam(team)
      }, this);
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
   * Updates a team member in the list.
   */
  private updateTeam(team: Team) {
    console.log('hahahaha');
    if (team === this.route.snapshot.params['team']) {
      this.snapshot = team;

      this.updateFromSnapshot();
    }
  }
}