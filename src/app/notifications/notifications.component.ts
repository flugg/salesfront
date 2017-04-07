import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../core/sidebar.service';

@Component({
  selector: 'vmo-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * Constructs the component.
   */
  constructor(public sidebar: SidebarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {}
}
