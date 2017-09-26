import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TeamMember } from '../../../../core/models/team-member.model';
import { User } from '../../../../core/models/user.model';
import { TeamMemberService } from '../../../../core/services/team-member.service';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { MemberListService } from '../shared/member-list.service';

@Component({
  templateUrl: 'edit-members.component.html'
})
export class EditMembersComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;
  members: TeamMember[];

  private subscriptions: Subscription[] = [];

  constructor(private activeUser: ActiveUserService,
              private snackBar: MdSnackBar,
              private memberList: MemberListService,
              private teamMemberService: TeamMemberService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.memberList.members
    ).subscribe(data => {
      [this.user, this.members] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  removeMember(member: TeamMember) {
    this.teamMemberService.remove(member).then(() => {
      this.snackBar.open(member.member.user.name + ' removed', 'Undo', <MdSnackBarConfig>{ duration: 5000 }).onAction().subscribe(() => {
        this.teamMemberService.add(member.member, member.teamId).then(() => {
          this.snackBar.open(member.member.user.name + ' added to team', null, <MdSnackBarConfig>{ duration: 2000 });
        });
      });
    });
  }

  toggleLeadership(member: TeamMember) {
    this.teamMemberService.update(member, {
      isLeader: !member.isLeader
    });
  }
}
