import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { User } from '../../../../../shared/user.model';
import { ActiveUserService } from '../../../../../active-user.service';
import { TopDailySellersListService } from './top-daily-sellers-list.service';
import { TopDailySeller } from '../../shared/top-daily-seller.model';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The list of top daily sellers.
   */
  topDailySellers: TopDailySeller[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public topDailySellersList: TopDailySellersListService,
              private activeUser: ActiveUserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.topDailySellersList.sellers
    ).subscribe(data => {
      [this.user, this.topDailySellers] = data;
      console.log('this.topDailySellers');
      console.log(this.topDailySellers);
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
