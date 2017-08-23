import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';
import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../../../core/models/team.model';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {
  readonly teams: Observable<Team[]> = this.subject.asObservable();

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
        'team_created': team => this.addTeam(team),
        'team_updated': team => this.updateTeam(team)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addTeam(team: Team) {
    this.snapshot.push(team);
    this.updateFromSnapshot();
  }

  private updateTeam(team: Team) {
    for (const key in this.snapshot) {
      if (this.snapshot[key].id === team.id) {
        this.snapshot[key] = team;
      }
    }

    this.updateFromSnapshot();
  }
}