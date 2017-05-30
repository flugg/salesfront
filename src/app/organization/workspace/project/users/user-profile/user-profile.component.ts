import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../shared/user.service';
import { User } from '../../../../shared/user.model';

@Component({
  templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected user.
   */
  user: User;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private route: ActivatedRoute,
              private userService: UserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.userService.find(this.route.snapshot.params.member).subscribe(user => {
      this.user = user;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
