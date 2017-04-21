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
              private paginator: Paginator) {}

  savedProject() {
    return localStorage.getItem('currentProject');
  }
  /**
  * Get the last active project
  * */
  project(): Observable<Project> {
    const currentProject = this.savedProject();

    const projectSubject = new BehaviorSubject(null);

    if (currentProject)
      this.api.get('projects/${currentProject}').map(project => project.data).subscribe(data => projectSubject.next(data));

    return projectSubject.filter(project => project != null);
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
   * Fetch a project by id.
   */
  find(id: string): Observable<Project> {
    localStorage.setItem('currentProject', id);
    return this.api.get(`project/${id}`).map(response => response.data);
  }

  /**
   * Create a new project
   */
  create(Project): Promise<Project> {
    return this.api.post('conversations', Project).then(response => response.data);
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
