import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import { Observable } from 'rxjs/Observable';

import { ActiveUserService } from './active-user.service';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private activeUserService: ActiveUserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.activeUserService.user.filter(user => user !== null).mapTo(true);
  }
}