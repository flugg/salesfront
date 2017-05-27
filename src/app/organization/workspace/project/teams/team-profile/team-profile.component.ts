import { Component, OnInit } from '@angular/core';

import { SelectedTeamService } from './selected-team.service';
import { Team } from '../../shared/team.model';
import { LeaderListService } from './leader-list/leader-list.service';
import { MemberListService } from './member-list/member-list.service';

@Component({
  providers: [SelectedTeamService, LeaderListService, MemberListService],
  templateUrl: 'team-profile.component.html'
})
export class TeamProfileComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected team-profile.
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
