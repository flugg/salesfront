import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { Membership } from '../../core/models/membership.model';

@Injectable()
export class MemberService {

  /**
   * Construct the service.
   */
  constructor(private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of the organization's users.
   */
  get(projectId: string, cursor: BehaviorSubject<number>): Observable<Membership[]> {
    const users = this.paginator.paginate(`projects/${projectId}/memberships`, cursor);

    return users.asObservable();
  }

  /**
   * Fetch an updating stream of the users belonging to a project.
   */
  getWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<Membership[]> {
    const users = this.paginator.paginate(`projects/${projectId}/memberships`, cursor);

    this.onMemberAdded(projectId, member => users.prepend(member));

    return users.asObservable();
  }

  /**
   * Registers a listener for new memberships in project.
   * */
  onMemberAdded(projectId: string, callback: Function): MemberService {
    this.sockets.listenForProject(projectId, 'InviteAccepted', user => callback(user));

    return this;
  }

  /**
   * Registers a listener for new memberships in project.
   * */
  onMemberRemoved(projectId: string, callback: Function): MemberService {
    this.sockets.listenForProject(projectId, 'MemberRemoved', user => callback(user));

    return this;
  }
}
