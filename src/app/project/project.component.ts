import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActiveProjectService } from '../core/active-project.service';

@Component({
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {

  /**
   * Constructs the component.
   */
  constructor(private route: ActivatedRoute,
              private activeProject: ActiveProjectService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeProject.set(this.route.snapshot.params.id);
  }
}
