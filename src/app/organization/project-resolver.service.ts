import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ActiveProjectService } from '../core/active-project.service';
import { Project } from '../core/project.model';

@Injectable()
export class ProjectResolver implements Resolve<Project> {

  /**
   * Constructs the route resolver.
   */
  constructor(private activeProject: ActiveProjectService) {}

  /**
   * Resolves the active project.
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.activeProject.setInStorage(route.params.project);
    return this.activeProject.fresh();
  }
}