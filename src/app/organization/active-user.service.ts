import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../core/sockets/observable-resource';
import { UserService } from './shared/user.service';
import { User } from './shared/user.model';
import { SocketApiService } from '../core/sockets/socket-api.service';

@Injectable()
export class ActiveUserService extends ObservableResource implements OnDestroy {

  /**
   * The observable active conversation.
   */
  readonly user: Observable<User> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private userService: UserService,
              private sockets: SocketApiService) {
    super();

    this.userService.find('me').subscribe(user => {
      this.set(user);

      this.sockets.listenForUser(user.id, {
        'user_updated': updatedUser => this.set(updatedUser)
      }, this);
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}
