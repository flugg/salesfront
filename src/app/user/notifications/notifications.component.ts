import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded notifications.
   */
  notifications: any[];

  /**
   * The cursor for the paginated notifications.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor() {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.notifications = [];
    this.isLoading = false;
  }
}
