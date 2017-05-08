import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

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
