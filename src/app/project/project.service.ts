import { Injectable } from '@angular/core';

import { Paginator } from '../core/paginator.service';
import { SocketApiService } from '../core/socket-api.service';
import { RestApiService } from '../core/rest-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Project } from '../core/models/project.model';

@Injectable()
export class ProjectService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of projects
   * */
  get(cursor: BehaviorSubject<number>): Observable<Project[]> {
    const projects = this.paginator.paginate('projects', cursor);

    return projects.asObservable();
  }

  /**
   * Fetch an updating stream of projects.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): Observable<Project[]> {
    const projects = this.paginator.paginate('projects', cursor);

    this.onCreated(project => {
      projects.append(project);
    });

    return projects.asObservable();
  }

  /**
   * Registers a listener for new projects.
   */
  onCreated(callback: Function): ProjectService {
    this.sockets.listenForAccount('project_created', conversation => callback(conversation));
    return this;
  }

  /**
   * Registers a listener for new members.
   */
  onMemberAdded(callback: Function): ProjectService {
    this.sockets.listenForAccount('member_added', user => callback(user));
    return this;
  }

  /**
   * Registers a listener for leaving members.
   */
  onMemberRemoved(callback: Function): ProjectService {
    this.sockets.listenForAccount('member_removed', user => callback(user));
    return this;
  }

  /**
   * Registers a listener for new teams.
   */
  onTeamAdded(callback: Function): ProjectService {
    this.sockets.listenForAccount('team_added', team => callback(team));
    return this;
  }

  /**
   * Registers a listener for removed teams.
   */
  onTeamRemoved(callback: Function): ProjectService {
    this.sockets.listenForAccount('team_removed', team => callback(team));
    return this;
  }
}
