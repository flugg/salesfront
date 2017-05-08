import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { TeamService } from '../team.service';
import { Team } from '../../shared/team.model';
import { ActiveProjectService } from '../../../../../core/active-project.service';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private teamService: TeamService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.teamService.get(project.id, limit, this.cursor))
          .subscribe(teams => this.add(teams));
      });

      this.sockets.listenForProject(project.id, {
        'team_created': team => this.addTeam(team)
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
   * Adds a team to the list.
   */
  private addTeam(team: Team) {
    this.snapshot.push(team);
    this.updateFromSnapshot();
  }
}