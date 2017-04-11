import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../../core/models/user.model';

@Component({
  selector: 'vmo-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * The cursor for the paginated users.
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
    this.users = [];
    this.isLoading = false;
  }
}
