import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActiveUserService } from './active-user.service';

@Injectable()
export class OrganizationResolver implements Resolve<boolean> {
  constructor(private activeUserService: ActiveUserService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
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