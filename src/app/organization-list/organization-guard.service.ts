import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActiveUserService } from './active-user.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private activeUserService: ActiveUserService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.activeUserService.user.map(user => {
      const membership = user.memberships.find(member => {
        return !member.deletedAt && member.organization.slug === route.params['organization'];
      });

      if (!membership) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    });
  }
}
