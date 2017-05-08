import { Component, OnInit } from '@angular/core';

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
