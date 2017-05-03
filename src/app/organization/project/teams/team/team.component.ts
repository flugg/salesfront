import { Component, OnInit } from '@angular/core';

import { ActiveTeamService } from './active-team.service';
import { Team } from '../../shared/team.model';

@Component({
  providers: [ActiveTeamService],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected team.
   */
  team: Team;

  /**
   * Constructs the component.
   */
  constructor(private activeTeam: ActiveTeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeTeam.team.subscribe(team => {
      this.team = team;
      this.loading = false;
    });
  }
}
