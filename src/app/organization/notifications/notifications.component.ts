import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  loading = true;
  notifications: any[];

  constructor() {}

  ngOnInit() {
    this.notifications = [];
    this.loading = false;
  }
}
