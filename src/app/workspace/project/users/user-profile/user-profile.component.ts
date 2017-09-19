import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DailyAward } from '../../../../core/models/daily-award.model';
import { Member } from '../../../../core/models/member.model';
import { MonthlyAward } from '../../../../core/models/monthly-award.model';
import { Project } from '../../../../core/models/project.model';
import { Team } from '../../../../core/models/team.model';
import { WeeklyAward } from '../../../../core/models/weekly-award.model';
import { MemberService } from '../../../../core/services/member.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { ActiveProjectService } from '../../../active-project.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { DailyAwardListService } from './daily-award-list.service';
import { MonthlyAwardListService } from './monthly-award-list.service';
import { SelectedMembershipService } from './selected-membership.service';
import { SendMessageDialogComponent } from './send-message-dialog/send-message-dialog.component';
import { WeeklyAwardListService } from './weekly-award-list.service';

@Component({
  providers: [SelectedMembershipService, DailyAwardListService, WeeklyAwardListService, MonthlyAwardListService],
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loading = true;
  activeMember: Member;
  project: Project;
  member: Member;
  team: Team;
  dailyAwards: DailyAward[];
  weeklyAwards: WeeklyAward[];
  monthlyAwards: MonthlyAward[];
  role: string;
  canEdit: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MdDialog,
              private snackBar: MdSnackBar,
              private memberService: MemberService,
              private selectedMembershipService: SelectedMembershipService,
              private activeProjectService: ActiveProjectService,
              private activeMembershipService: ActiveMembershipService,
              private dailyAwardListService: DailyAwardListService,
              private weeklyAwardListService: WeeklyAwardListService,
              private monthlyAwardListService: MonthlyAwardListService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedMembershipService.membership,
      this.activeProjectService.project,
      this.activeMembershipService.membership,
      this.dailyAwardListService.awards,
      this.weeklyAwardListService.awards,
      this.monthlyAwardListService.awards
    ).subscribe(data => {
      [this.member, this.project, this.activeMember, this.dailyAwards, this.weeklyAwards, this.monthlyAwards] = data;

      if (this.member.deletedAt && !this.activeMember.user.isAdmin) {
        this.router.navigate(['..'], { relativeTo: this.route });
      }

      this.role = this.getRole();
      this.canEdit = this.checkIfCanEdit();
      this.loading = false;
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

  sendMessage() {
    this.dialog.open(SendMessageDialogComponent, <MdDialogConfig>{
      width: '400px',
      data: {
        organizationId: this.member.organizationId,
        participants: [this.member]

      }
    });
  }

  recoverMember() {
    this.memberService.recover(this.member.id).then(() => {
      this.snackBar.open('Member reactivated', null, <MdSnackBarConfig>{ duration: 2000 });
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
