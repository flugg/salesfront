import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vmo-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * Constructs the component.
   */
  constructor() {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.isLoading = false;
  }
}
