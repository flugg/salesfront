import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../core/auth/user.service';

@Component({
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
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated users.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor(private userService: UserService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.userService.getWithUpdates(this.cursor).subscribe(users => {
      this.users = users;
      this.isLoading = false;
    }));
  }
}
