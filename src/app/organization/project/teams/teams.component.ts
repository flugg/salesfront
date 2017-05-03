import { Component, OnInit } from '@angular/core';

import { TeamListService } from './team-list.service';

@Component({
  providers: [TeamListService],
  templateUrl: 'teams.component.html'
})
export class TeamsComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded teams.
   */
  teams: any[];

  /**
   * Constructs the component.
   */
  constructor(public teamList: TeamListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.teamList.teams.subscribe(teams => {
      this.teams = teams;
      this.loading = false;
    });
  }
}
