import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  /**
   * Constructs the guard.
   */
  constructor(private auth: AuthService) {
  }

  /**
   * Indicates if a route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isNotAuthenticated();
  }

  /**
   * Indicates if a child route can be activated.
   * */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isNotAuthenticated();
  }

  /**
   * Indicates if a route can be loaded.
   * */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isNotAuthenticated();
  }

  /**
   * Checks if the current user is authenticated.
   * */
  private isNotAuthenticated(): Observable<boolean> {
    return Observable.of(!this.auth.isAuthenticated());
  }
}
