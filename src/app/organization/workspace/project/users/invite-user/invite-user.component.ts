import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { MembershipService } from '../../../../shared/membership.service';
import { InviteService } from '../shared/invite.service';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  templateUrl: 'invite-user.component.html',
  styleUrls: ['invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  /**
   * The admin flag checkbox.
   */
  isAdmin: boolean;

  /**
   * The first name input value.
   */
  firstName: string;

  /**
   * The last name input value.
   */
  lastName: string;

  /**
   * The email input value.
   */
  email: string;

  /**
   * The password input value.
   */
  password: string;

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Indicates if you want to stay on the invite user page.
   */
  inviteMore = false;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private inviteService: InviteService,
              private userService: UserService,
              private membershipService: MembershipService,
              private activeMembership: ActiveMembershipService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.loading = false;
  }

  /**
   * Submits the form to register a user.
   */
  submit() {
    this.activeMembership.membership.subscribe(membership => {
      this.inviteService.sendInvite(membership.projectId, this.email).then(invite => {
        this.userService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        }).then(user => {
          this.membershipService.create(invite.id, user.id).then(member => {
            if (! this.inviteMore) {
              this.router.navigate(['projects', member.projectId, 'users', 'members', member.id]);
            }

            this.snackBar.open('User registered', null, <MdSnackBarConfig>{ duration: 2000 });
          });
        });
      });
    });
  }
}
