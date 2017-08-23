import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ActiveProjectService } from '../active-project.service';
import { Project } from '../../core/models/project.model';

@Injectable()
export class ActiveProjectResolver implements Resolve<Project> {
  constructor(private activeProjectService: ActiveProjectService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.activeProjectService.setInStorage(route.params['project']);
    return this.activeProjectService.project.filter(project => project.id === route.params['project']).first();
  }
}