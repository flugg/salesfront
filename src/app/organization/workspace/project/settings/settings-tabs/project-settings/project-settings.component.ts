import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'project-settings.component.html'
})
export class ProjectSettingsComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.loading = false;
  }
}
