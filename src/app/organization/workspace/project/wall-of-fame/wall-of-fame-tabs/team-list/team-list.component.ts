import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActiveUserService } from '../../../../../active-user.service';
import { User } from '../../../../../shared/user.model';

@Component({
  templateUrl: 'team-list.component.html',
})
export class TeamListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private activeUser: ActiveUserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeUser.user.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
