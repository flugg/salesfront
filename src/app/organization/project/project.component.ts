import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../core/sidebar/sidebar.service';
import { ActiveProjectService } from '../../core/active-project.service';

@Component({
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  /**
   * Constructs the component.
   */
  constructor(private activeProject: ActiveProjectService,
              private sidebar: SidebarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeProject.project.first().subscribe(() => this.sidebar.enable());
  }
}
