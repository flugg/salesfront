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
    const projects = this.paginator.paginate(`projects`, cursor, {});

    return projects.asObservable();
  }

  getWithUpdates(cursor: BehaviorSubject<number>): Observable<Project[]> {
    const projects = this.paginator.paginate('projects', cursor);

    this.onStarted(project => projects.prepend(project));
        // .onMembershipAdded();
    return projects.asObservable();
  }

  /**
   * Registers a listener for new conversations.
   */
  onStarted(callback: Function): ProjectService {
    this.sockets.listenForUser('project_started', conversation => callback(conversation));
    return this;
  }

  /**
   * Registers a listener for new members.
   */
  onMembershipAdded(callback: Function): ProjectService {
    this.sockets.listenForUser('member_added', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for leaving members.
   */
  onMembershipRemoved(callback: Function): ProjectService {
    this.sockets.listenForUser('member_removed', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for new members.
   */
  onTeamAdded(callback: Function): ProjectService {
    this.sockets.listenForUser('team_added', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for leaving members.
   */
  onTeamRemoved(callback: Function): ProjectService {
    this.sockets.listenForUser('team_removed', message => callback(message));
    return this;
  }
}
