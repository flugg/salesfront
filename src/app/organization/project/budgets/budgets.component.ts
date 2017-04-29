import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: 'budgets.component.html'
})
export class BudgetsComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded budgets.
   */
  budgets: any[];

  /**
   * The cursor for the paginated budgets.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.budgets = [];
    this.isLoading = false;
  }
}
