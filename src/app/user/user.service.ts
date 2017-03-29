import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../core/models/user.model';
import { RestApiService } from '../core/rest-api.service';
import { SocketApiService } from '../core/socket-api.service';
import { ResourceListSubject } from '../core/utils/subjects/resource-list-subject';
import { ResourceSubject } from '../core/utils/subjects/resource-subject';


@Injectable()
export class UserService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService, private sockets: SocketApiService) {}

  /**
   * Fetch a list of the account's users.
   */
  get(cursor: BehaviorSubject<number>): ResourceListSubject<User[]> {
    const subject = new ResourceListSubject([]);

    cursor.subscribe(limit => {
      this.api.paginate('users', subject.nextCursor(), limit).subscribe(response => {
        subject.setCursor(response.cursor);
        subject.appendMany(response.data);

        if (!subject.nextCursor()) {
          cursor.complete();
        }
      });
    });

    return subject;
  }

  /**
   * Fetch an updating stream of the users.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): ResourceListSubject<User[]> {
    const subject = this.get(cursor);

    return subject;
  }

  /**
   * Fetch a user by id.
   */
  find(id: string): ResourceSubject<User> {
    const subject = new ResourceSubject({});

    this.api.get(`users/${id}`).map(response => response.data).subscribe(user => {
      subject.next(user);
    });

    return subject;
  }

  /**
   * Fetch an updating stream of a single user by id.
   */
  findWithUpdates(id: string): ResourceSubject<User> {
    const subject = this.find(id);

    return subject;
  }
}
