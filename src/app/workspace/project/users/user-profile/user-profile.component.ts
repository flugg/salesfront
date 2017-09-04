import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { TeamService } from '../../../../core/services/team.service';
import { SelectedMembershipService } from './selected-membership.service';
import { DailyAwardListService } from './daily-award-list.service';
import { WeeklyAwardListService } from './weekly-award-list.service';
import { MonthlyAwardListService } from './monthly-award-list.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { DailyAward } from '../../../../core/models/daily-award.model';
import { Member } from '../../../../core/models/member.model';
import { Team } from '../../../../core/models/team.model';
import { WeeklyAward } from '../../../../core/models/weekly-award.model';
import { MonthlyAward } from '../../../../core/models/monthly-award.model';

@Component({
  providers: [SelectedMembershipService, DailyAwardListService, WeeklyAwardListService, MonthlyAwardListService],
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loading = true;
  activeMember: Member;
  member: Member;
  team: Team;
  dailyAwards: DailyAward[];
  weeklyAwards: WeeklyAward[];
  monthlyAwards: MonthlyAward[];
  role: string;
  canEdit: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private dialog: MdDialog,
              private selectedMembershipService: SelectedMembershipService,
              private activeMembershipService: ActiveMembershipService,
              private dailyAwardListService: DailyAwardListService,
              private weeklyAwardListService: WeeklyAwardListService,
              private monthlyAwardListService: MonthlyAwardListService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedMembershipService.membership,
      this.activeMembershipService.membership,
      this.dailyAwardListService.awards,
      this.weeklyAwardListService.awards,
      this.monthlyAwardListService.awards,
    ).subscribe(data => {
      [this.member, this.activeMember, this.dailyAwards, this.weeklyAwards, this.monthlyAwards] = data;
      if (this.member.teamMembers && this.member.teamMembers.length) {
        this.subscriptions.push(this.teamService.find(this.member.teamMembers[0].teamId).subscribe(team => {
          this.team = team;
          this.role = this.getRole();
          this.canEdit = this.checkIfCanEdit();
          this.loading = false;
        }));
      } else {
        this.role = this.getRole();
        this.canEdit = this.checkIfCanEdit();
        this.loading = false;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getRole(): string {
    if (this.member.user.isAdmin) {
      return 'Administrator';
    }

    for (const teamMember of this.member.teamMembers) {
      if (teamMember.isLeader) {
        return 'Team Leader';
      }
    }

    return 'Seller';
  }

  openProfilePicture(): void {
    this.dialog.open(ProfilePictureComponent, <MdDialogConfig>{
      panelClass: 'profile-picture-dialog',
      data: {
        imagePath: this.member.user.avatarPath,
        route: this.route
      }
    });
  }

  private checkIfCanEdit(): boolean {
    if (this.activeMember.user.isAdmin) {
      return true;
    }

    if (this.activeMember.userId === this.member.userId) {
      return true;
    }

    return false;
  }
}
