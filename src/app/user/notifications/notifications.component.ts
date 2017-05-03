import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded notifications.
   */
  notifications: any[];

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.notifications = [];
    this.loading = false;
  }
}
