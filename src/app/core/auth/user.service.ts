import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { RestApiService } from '../rest-api.service';
import { SocketApiService } from '../socket-api.service';
import { Paginator } from '../paginator.service';
import { ResourceSubject } from '../utils/subjects/resource-subject';

@Injectable()
export class UserService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {}

  /**
   * Fetch a list of the account's users.
   */
  get(cursor: BehaviorSubject<number>): Observable<User[]> {
    const users = this.paginator.paginate('users', cursor);

    return users.asObservable();
  }

  /**
   * Fetch an updating stream of the users.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): Observable<User[]> {
    const users = this.paginator.paginate('users', cursor);

    return users.asObservable();
  }

  /**
   * Fetch a user by id.
   */
  find(id: string): Observable<User> {
    return this.api.get(`users/${id}`).map(response => response.data);
  }

  /**
   * Fetch an updating stream of a single user by id.
   */
  findWithUpdates(id: string): Observable<User> {
    const user = new ResourceSubject(null);

    this.find(id).subscribe(data => {
      user.next(data);
    });

    return user.asObservable();
  }
}
