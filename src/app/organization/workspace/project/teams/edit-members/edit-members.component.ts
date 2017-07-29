import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { User } from '../../../../shared/user.model';
import { ActiveUserService } from '../../../../active-user.service';
import { TeamMemberService } from '../../../../shared/team-member.service';
import { TeamMember } from '../../../../shared/team-member.model';
import { MemberListService } from '../shared/member-list.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  templateUrl: 'edit-members.component.html'
})
export class EditMembersComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The selected team's members.
   */
  members: TeamMember[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private activeUser: ActiveUserService,
              private snackBar: MdSnackBar,
              private memberList: MemberListService,
              private teamMemberService: TeamMemberService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.memberList.members
    ).subscribe(data => {
      [this.user, this.members] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Removes a member from the selected team.
   */
  removeMember(member: TeamMember) {
    this.teamMemberService.remove(member).then(() => {
      this.snackBar.open(member.membership.user.name + ' removed', 'Undo', <MdSnackBarConfig>{ duration: 5000 }).onAction().subscribe(() => {
        this.teamMemberService.add(member.membership, member.teamId).then(() => {
          this.snackBar.open(member.membership.user.name + ' added to team', null, <MdSnackBarConfig>{ duration: 2000 });
        });
      });
    });
  }

  /**
   * Toggles team leadership for the given member.
   */
  toggleLeadership(member: TeamMember) {
    this.teamMemberService.update(member, {
      isLeader: !member.isLeader
    });
  }
}
