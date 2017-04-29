import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProjectListService } from './project-list.service';
import { Project } from '../project.model';

@Component({
  providers: [ProjectListService],
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

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
  constructor(private projectList: ProjectListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.projectList.projects.subscribe(projects => {
      this.projects = projects;
      this.isLoading = false;
    }));
  }
}
