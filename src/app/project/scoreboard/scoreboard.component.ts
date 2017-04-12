import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'vmo-scoreboard',
  templateUrl: 'scoreboard.component.html'
})
export class ScoreboardComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded sales.
   */
  sales: any[];

  /**
   * The cursor for the paginated sales.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor() {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.sales = [];
    this.isLoading = false;
  }
}