import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../core/models/project.model';
import { ActiveProjectService } from '../active-project.service';

@Injectable()
export class UnsetProjectResolver implements Resolve<Project> {
  constructor(private activeProjectService: ActiveProjectService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.activeProjectService.unsetFromStorage();
    return this.activeProjectService.project.filter(project => project === null).first();
  }
}