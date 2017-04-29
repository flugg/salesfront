import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { UserService } from '../../../core/user.service';
import { User } from '../../../core/user.model';

@Injectable()
export class UserListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of users.
   */
  readonly users: Observable<User[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private userService: UserService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.userService.get(limit, this.cursor)).subscribe(users => this.add(users));
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