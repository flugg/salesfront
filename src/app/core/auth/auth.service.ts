import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';
import { RestApiService } from '../rest-api.service';
import { ResourceSubject } from '../utils/subjects/resource-subject';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  /**
   * The authenticated user.
   */
  private currentUser: ResourceSubject<User>;

  /**
   * Construct the service.
   */
  constructor(private tokenService: TokenService,
              private api: RestApiService) {}

  /**
   * Attempts to authenticate the user by the given credentials.
   */
  attempt(email: string, password: string): Observable<boolean> {
    const observable = this.tokenService.grant(email, password);

    observable.subscribe(token => {
      this.tokenService.set(token);
    });

    return observable.map(token => true);
  }

  /**
   * Checks if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.tokenService.isValid();
  }

  /**
   * Fetch the logged in user.
   */
  user(): ResourceSubject<User> {
    if (! this.currentUser) {
      this.currentUser = new ResourceSubject(null);

      this.api.get('users/me').map(response => response.data).subscribe(data => {
        this.currentUser.next(data);
      });
    }

    return this.currentUser;
  }
}
