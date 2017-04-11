import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'vmo-teams',
  templateUrl: 'teams.component.html'
})
export class TeamsComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded teams.
   */
  teams: any[];

  /**
   * The cursor for the paginated teams.
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
    this.teams = [];
    this.isLoading = false;
  }
}
