import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SaleService } from '../sales/sale.service';

@Component({
  selector: 'vmo-leaderboard',
  templateUrl: 'leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  navLinks = [['Teams', 'teams'], ['Users', 'users']];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor() {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.isLoading = false;
  }
}
