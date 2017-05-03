import { Component, OnInit } from '@angular/core';

import { ProjectListService } from './project-list.service';
import { Project } from '../../core/project.model';
import { SidebarService } from '../../core/sidebar/sidebar.service';

@Component({
  providers: [ProjectListService],
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of projects.
   **/
  projects: Project[];

  /**
   * Constructs the component.
   */
  constructor(public projectList: ProjectListService,
              private sidebar: SidebarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.sidebar.disable();

    this.projectList.projects.subscribe(projects => {
      this.projects = projects;
      this.loading = false;
    });
  }
}
