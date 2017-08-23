import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService) {}

  attempt(email: string, password: string): Observable<void> {
    return this.tokenService.grant(email, password).map(token => {
      this.tokenService.set(token);
    });
  }

  isAuthenticated(): boolean {
    return this.tokenService.isValid();
  }

  logout() {
    this.tokenService.unset();
  }
}
