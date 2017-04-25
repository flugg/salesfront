/**
 * Created by danielsteen on 14/04/2017.
 */
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../project/project.service';

@Injectable()
export class ProjectResolver implements Resolve<Project>{
    constructor(private projectService: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any> {
        return null; // this.projectService.project();
    }
}