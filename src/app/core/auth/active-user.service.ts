import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../sockets/observable-resource';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Injectable()
export class ActiveUserService extends ObservableResource {

  /**
   * The observable active conversation.
   */
  readonly user: Observable<User | null> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private userService: UserService) {
    super();

    this.userService.find('me').subscribe(user => this.set(user));
  }

  /**
   * Unsets the active user.
   */
  logout() {
    this.snapshot = null;
    this.updateFromSnapshot();
  }
}
