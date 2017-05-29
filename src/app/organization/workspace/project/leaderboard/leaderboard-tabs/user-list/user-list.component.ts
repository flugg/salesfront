import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { UserListService } from './user-list.service';
import { Membership } from '../../../../../shared/membership.model';
import { DatepickerService } from '../../shared/datepicker/datepicker.service';

@Component({
  templateUrl: 'user-list.component.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'scaleX(0)' }),
        animate('800ms ease-in-out', style({ transform: 'scaleX(1)' }))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Membership sales in project
   */
  memberships: Membership[];

  /**
   * The total value.
   */
  total: number;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public datepicker: DatepickerService,
              private userList: UserListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.userList.members.subscribe(memberships => {
      this.memberships = memberships;
      this.total = this.calculateTotal(memberships);
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Calculates the total from a list of memberships.
   */
  private calculateTotal(memberships: Membership[]): number {
    return memberships.reduce((value, membership) => value + membership.sales.length, 0);
  }
}
