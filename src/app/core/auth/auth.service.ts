import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';
import { SocketApiService } from '../socket-api.service';

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService,
              private socketService: SocketApiService) {}

  attempt(email: string, password: string): Observable<void> {
    return this.tokenService.grant(email, password).map(token => {
      this.tokenService.set(token);
      this.socketService.reconnectSilently();
    });
  }

  isAuthenticated(): boolean {
    return this.tokenService.isValid();
  }

  logout() {
    this.tokenService.unset();
  }
}
