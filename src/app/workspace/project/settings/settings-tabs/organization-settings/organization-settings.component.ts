import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'organization-settings.component.html'
})
export class OrganizationSettingsComponent implements OnInit {

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
