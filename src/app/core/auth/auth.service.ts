import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TokenService } from './token.service';

@Injectable()
export class AuthService {

  /**
   * Constructs the service.
   */
  constructor(private tokenService: TokenService) {}

  /**
   * Attempts to authenticate the user by the given credentials.
   */
  attempt(email: string, password: string): Observable<any> {
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
   * Logs the user out by destroying the token from storage.
   */
  logout() {
    this.tokenService.unset();
  }
}
