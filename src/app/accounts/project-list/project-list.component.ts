import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vmo-project-list',
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The cursor for the paginated projects.
   */
  cursor = new BehaviorSubject(15);

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Projects
   * */
  projects: Project[];

  /**
   * Constructs the component.
   */
  constructor(private projectService: ProjectService,
              private router: Router) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.projectService.getWithUpdates(this.cursor).subscribe(projects => {
      this.projects = projects;
      this.isLoading = false;
    }));
  }

  navigate(projectId: string){
    localStorage.setItem('currentProject', projectId);
    // console.log(localStorage.getItem('currentProject'));
    this.router.navigateByUrl(`projects/${projectId}`);
  }
}
