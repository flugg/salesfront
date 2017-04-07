import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../core/sidebar.service';

@Component({
  selector: 'vmo-budgets',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

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
