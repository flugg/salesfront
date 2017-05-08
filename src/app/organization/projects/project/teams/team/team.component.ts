import { Component, OnInit } from '@angular/core';

import { SelectedTeamService } from './selected-team.service';
import { Team } from '../../shared/team.model';

@Component({
  providers: [SelectedTeamService],
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
  constructor(private selectedTeam: SelectedTeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.selectedTeam.team.subscribe(team => {
      this.team = team;
      this.loading = false;
    });
  }
}
