import { Injectable } from '@angular/core'
import {
  CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivateChild,
  CanLoad, Route
} from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  /**
   * Construct the guard.
   */
  constructor(private auth: AuthService, private router: Router) { }

  /**
   * Indicates if a route can be activated.
   * Redirect to /login on auth failure
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticate();
  }

  /**
   * Indicates if a routes children can be activated.
   * Redirect to /login on auth failure
  * */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticate();
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticate();
  }

  /**
   * Checks if user is authenticated
   * Redirect to /login on auth failure
   * */
  private authenticate(): Observable<boolean> {
    const authState = this.auth.isAuthenticated();
    authState.subscribe(
      authCondition => {if(!authCondition) this.router.navigate(['/login'])}
    );
    return authState;
  }
}
