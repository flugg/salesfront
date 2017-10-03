import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../../../../core/models/member.model';
import { Team } from '../../../../core/models/team.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { MemberListService } from '../shared/member-list.service';
import { SelectedTeamService } from './selected-team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  providers: [SelectedTeamService, MemberListService],
  templateUrl: 'team-profile.component.html'
})
export class TeamProfileComponent implements OnInit {
  loading = true;
  team: Team;
  membership: Member;
  canEdit: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private activeMembershipService: ActiveMembershipService,
              private selectedTeamService: SelectedTeamService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedTeamService.team,
      this.activeMembershipService.membership
    ).subscribe(data => {
      [this.team, this.membership] = data;

      if (this.team.deletedAt) {
        this.router.navigate(['..'], { relativeTo: this.route });
      }

      this.canEdit = this.checkIfCanEdit();
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));
  }

  private checkIfCanEdit(): boolean {
    if (this.membership.user.isAdmin) {
      return true;
    }

    for (const member of this.membership.teamMembers) {
      if (member.teamId === this.team.id && member.isLeader) {
        return true;
      }
    }

    return false;
  }
}
