import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';
import { SocketApiService } from '../socket-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  authenticated = new BehaviorSubject<boolean>(false);

  constructor(private tokenService: TokenService,
              private socketService: SocketApiService) {}

  attempt(email: string, password: string): Observable<void> {
    return this.tokenService.grant(email, password).map(token => {
      this.tokenService.set(token);
      this.socketService.reconnectSilently();
      this.authenticated.next(true);
    });
  }

  isAuthenticated(): boolean {
    if (this.tokenService.isValid()) {
      this.authenticated.next(true);
      return true;
    }

    return false;
  }

  logout() {
    this.tokenService.unset();
    this.authenticated.next(false);
  }
}
