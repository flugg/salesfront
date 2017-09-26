import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Member } from '../../../../core/models/member.model';
import { Team } from '../../../../core/models/team.model';
import { TeamMemberService } from '../../../../core/services/team-member.service';

import { SelectedTeamService } from '../team-profile/selected-team.service';
import { MembershipListService } from './membership-list.service';

@Component({
  providers: [MembershipListService],
  templateUrl: 'add-member.component.html'
})
export class AddMemberComponent implements OnInit, OnDestroy {
  loading = true;
  memberships: Member[];
  team: Team;

  private subscriptions: Subscription[] = [];

  constructor(public membershipList: MembershipListService,
              private snackBar: MdSnackBar,
              private selectedTeam: SelectedTeamService,
              private teamMemberService: TeamMemberService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.membershipList.memberships,
      this.selectedTeam.team
    ).subscribe(data => {
      [this.memberships, this.team] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addMember(membership: Member) {
    this.teamMemberService.add(membership, this.team.id).then(() => {
      this.snackBar.open(membership.user.name + ' added to team', null, <MdSnackBarConfig>{ duration: 3000 });
    });
  }
}
