import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../core/sockets/observable-resource';
import { UserService } from './shared/user.service';
import { User } from './shared/user.model';

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

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
