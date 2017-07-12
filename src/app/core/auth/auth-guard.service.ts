import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  /**
   * Constructs the guard.
   */
  constructor(private auth: AuthService, private router: Router) {
  }

  /**
   * Indicates if a route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  /**
   * Indicates if a child route can be activated.
   * */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  /**
   * Indicates if a route can be loaded.
   * */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  /**
   * Checks if the current user is authenticated.
   * */
  private isAuthenticated(): Observable<boolean> {
    const authenticated = this.auth.isAuthenticated();

    if (!authenticated) {
      this.router.navigate(['/login']);
    }

    return Observable.of(authenticated);
  }
}
