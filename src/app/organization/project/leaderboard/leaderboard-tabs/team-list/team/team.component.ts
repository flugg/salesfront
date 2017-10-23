import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { slideIn } from '../../../../../../core/animations/slide-in';
import { Member } from '../../../../../../core/models/member.model';
import { Project } from '../../../../../../core/models/project.model';
import { Team } from '../../../../../../core/models/team.model';
import { ActiveProjectService } from '../../../../../active-project.service';
import { DatepickerService } from '../../../../../shared/datepicker/datepicker.service';
import { MemberListService } from './member-list.service';
import { SelectedTeamService } from './selected-team.service';

@Component({
  templateUrl: 'team.component.html',
  providers: [SelectedTeamService, MemberListService],
  animations: [slideIn()]
})
export class TeamComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  team: Team;
  members: Member[];
  total: number;

  private subscriptions: Subscription[] = [];

  constructor(public datepicker: DatepickerService,
              private activeProjectService: ActiveProjectService,
              private selectedTeam: SelectedTeamService,
              private memberListService: MemberListService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.selectedTeam.team,
      this.memberListService.members
    ).subscribe(data => {
      [this.project, this.team, this.members] = data;
      this.total = this.members.reduce((value, member) => value + member.value, 0);
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
