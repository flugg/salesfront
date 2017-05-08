import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../sockets/observable-resource';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Injectable()
export class ActiveUserService extends ObservableResource implements OnDestroy {

  /**
   * The observable active conversation.
   */
  readonly user: Observable<User> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private userService: UserService) {
    super();

    this.userService.find('me').subscribe(user => this.set(user));
  }

  ngOnDestroy() {
    console.log('WTF ALEX');
  }
}
