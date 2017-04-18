import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TokenService } from './token.service';
import { RestApiService } from '../rest-api.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  /**
   * The authenticated user.
   */
  private currentUser: BehaviorSubject<User>;

  /**
   * Construct the service.
   */
  constructor(private tokenService: TokenService,
              private api: RestApiService) {
  }

  /**
   * Attempts to authenticate the user by the given credentials.
   */
  attempt(email: string, password: string): Observable<boolean> {
    const authenticated = new Subject();

    this.tokenService.grant(email, password).subscribe(token => {
      this.tokenService.set(token);
      authenticated.next(true);
    }, () => {
      authenticated.next(false);

    });

    return authenticated.asObservable();
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
  user(): Observable<User> {
    if (!this.currentUser) {
      this.currentUser = new BehaviorSubject(null);

      this.api.get('users/me').map(response => response.data).subscribe(data => {
        this.currentUser.next(data);
      });
    }

    return this.currentUser.filter(user => user != null);
  }

  /**
   * Logs the user out by destroying the token from storage.
   */
  logout() {
    this.tokenService.unset();
  }
}
