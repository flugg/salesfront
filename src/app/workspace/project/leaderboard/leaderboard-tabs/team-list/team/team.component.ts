import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { slideIn } from '../../../../../../core/animations/slide-in';
import { DatepickerService } from '../../../shared/datepicker/datepicker.service';
import { SelectedTeamService } from './selected-team.service';
import { MemberListService } from './member-list.service';
import { Member } from '../../../../../../core/models/member.model';
import { Team } from '../../../../../../core/models/team.model';

@Component({
  providers: [SelectedTeamService, MemberListService],
  templateUrl: 'team.component.html',
  animations: [slideIn()]
})
export class TeamComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  team: Team;
  members: Member[];
  total: number;

  private subscriptions: Subscription[] = [];

  constructor(public datepicker: DatepickerService,
              private selectedTeam: SelectedTeamService,
              private memberListService: MemberListService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedTeam.team,
      this.memberListService.members
    ).subscribe(data => {
      [this.team, this.members] = data;
      this.total = this.members.reduce((value, member) => value + member.value, 0);
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
