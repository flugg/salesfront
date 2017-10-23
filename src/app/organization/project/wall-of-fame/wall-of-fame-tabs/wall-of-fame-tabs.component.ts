import { Component, OnInit } from '@angular/core';

import { DailyTeamAwardListService } from './team-list/daily-team-award-list.service';
import { MonthlyTeamAwardListService } from './team-list/monthly-team-award-list.service';
import { WeeklyTeamAwardListService } from './team-list/weekly-team-award-list.service';
import { YearlyTeamAwardListService } from './team-list/yearly-team-award-list.service';
import { DailyAwardListService } from './user-list/daily-award-list.service';
import { MonthlyAwardListService } from './user-list/monthly-award-list.service';
import { WeeklyAwardListService } from './user-list/weekly-award-list.service';
import { YearlyAwardListService } from './user-list/yearly-award-list.service';

@Component({
  providers: [
    DailyAwardListService, WeeklyAwardListService, MonthlyAwardListService, YearlyAwardListService,
    DailyTeamAwardListService, WeeklyTeamAwardListService, MonthlyTeamAwardListService, YearlyTeamAwardListService
  ],
  templateUrl: 'wall-of-fame-tabs.component.html',
  styleUrls: ['wall-of-fame-tabs.component.scss']
})
export class WallOfFameTabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
