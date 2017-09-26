import { Component, OnInit } from '@angular/core';

import { MemberListService } from './user-list/member-list.service';
import { TeamListService } from './team-list/team-list.service';
import { DatepickerService } from '../shared/datepicker/datepicker.service';

@Component({
  providers: [MemberListService, TeamListService],
  selector: 'vmo-leaderboard-tabs',
  templateUrl: 'leaderboard-tabs.component.html'
})
export class LeaderboardTabsComponent implements OnInit {
  date: string;

  constructor(public datepicker: DatepickerService) {}

  ngOnInit() {
    this.date = 'Today';
  }
}
