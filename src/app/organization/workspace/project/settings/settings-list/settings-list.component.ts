import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'settings-list.component.html'
})
export class SettingsListComponent implements OnInit {

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
