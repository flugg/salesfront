import { Injectable } from '@angular/core';
import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../core/models/team.model';
import { ResourceSubject } from '../../core/utils/subjects/resource-subject';

@Injectable()
export class TeamService {
  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of the organization's users.
   */
  get(cursor: BehaviorSubject<number>): Observable<Team[]> {
    const teams = this.paginator.paginate('teams', cursor);

    return teams.asObservable();
  }

  /**
   * Fetch an updating stream of the users belonging to a project.
   */
  getWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<Team[]> {
    const teams = this.paginator.paginate(`projects/${projectId}/teams`, cursor, {include: 'project'});

    this.onTeamAdded(projectId, team => teams.prepend(team));
    // .on

    return teams.asObservable();
  }

  /**
   * Fetch an updating stream of the users belonging to an organization.
   */
  getAllWithUpdates(cursor: BehaviorSubject<number>): Observable<Team[]> {
    const teams = this.paginator.paginate('teams', cursor);

    return teams.asObservable();
  }

  /**
   * Fetch an invite by id.
   */
  find(id: string): Observable<Team> {
    return this.api.get(`invites/${id}`).map(response => response.data);
  }

  /**
   * Fetch an updating stream of a single user by id.
   */
  findWithUpdates(id: string): Observable<Team> {
    const team = new ResourceSubject(null);

    this.find(id).subscribe(data => {
      team.next(data);
    });

    return team.asObservable();
  }

  /**
   * Registers a listener for new invites.
   * */
  onTeamAdded(projectId: string, callback: Function) {
    this.sockets.listenForProject(projectId, 'team_invite_sent', invite => callback(invite));
  }

}
