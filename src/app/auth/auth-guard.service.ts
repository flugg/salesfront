import { Injectable } from '@angular/core'
import { CanActivate , RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  
  /** 
   * Whether the user is authenticated. 
   */
  private authenticated: boolean = false

  /**
   * Construct the guard.
   */
  constructor(private auth: AuthService, private router: Router) { }

  /**
   * Indicates if a route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.auth.isAuthenticated()
  }
}