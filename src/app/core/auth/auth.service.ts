import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class AuthService {

  /**
   * The authenticated user.
   */
  private currentUser: BehaviorSubject<User>;

  /**
   * Construct the service.
   */
  constructor(private tokenService: TokenService, private api: RestApiService) {
  }

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
   * Checks if the user is authenticated.
   */
  user() {
    if (!this.currentUser) {
      this.currentUser = this.fetchCurrentUser();
    }

    return this.currentUser;
  }

  /**
   * Fetches the current user.
   */
  private fetchCurrentUser(): BehaviorSubject<any> {
    const subject = new BehaviorSubject({});

    this.api.get('users/me').map(response => response.data).subscribe(user => {
      subject.next(user);
    });

    return subject;
  }

  navigateToLanding() {
    // let projectUrl = '/projects';
    // let currentProject = localStorage.getItem('current_project');
    // if (currentProject) projectUrl += '/' + currentProject;
    // this.router.navigateByUrl(projectUrl);
  }
}
