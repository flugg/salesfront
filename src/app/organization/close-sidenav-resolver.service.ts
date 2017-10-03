import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { SidenavService } from './sidenav.service';

@Injectable()
export class CloseSidenavResolver implements Resolve<boolean> {
  constructor(private sidenavService: SidenavService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.sidenavService.closeIfOver().first();
  }
}