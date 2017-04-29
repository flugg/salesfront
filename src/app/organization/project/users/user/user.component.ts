import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../core/user.service';
import { User } from '../../../../core/user.model';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  /**
   * Weather or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The selected user.
   */
  user: User;

  /**
   * List of all observable subscriptions.
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
    this.subscriptions.push(this.userService.find(this.route.snapshot.url[0].path).subscribe(user => {
      this.user = user;
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
