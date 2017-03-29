import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserResolver implements Resolve<User> {

  /**
   * Constructs the route resolver.
   */
  constructor(private auth: AuthService) {}

  /**
   * Resolves data.
   */
  resolve(): Observable<User> {
    return this.auth.user();
  }
}