import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MembershipListService } from '../membership-list.service';
import { Membership } from '../../shared/membership.model';

@Component({
  providers: [MembershipListService],
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded membersips.
   */
  memberships: Membership[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private membershipList: MembershipListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.membershipList.memberships.subscribe(memberships => {
      this.memberships = memberships;
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
