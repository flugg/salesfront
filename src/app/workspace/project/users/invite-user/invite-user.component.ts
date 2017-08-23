import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/first';

import { InviteService } from '../../../../core/services/invite.service';
import { UserService } from '../../../../core/services/user.service';
import { MemberService } from '../../../../core/services/member.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';

@Component({
  templateUrl: 'invite-user.component.html',
  styleUrls: ['invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading = true;
  inviteMore = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private inviteService: InviteService,
              private userService: UserService,
              private memberService: MemberService,
              private activeMembershipService: ActiveMembershipService) {}

  ngOnInit() {
    this.loading = false;
  }

  submit() {
    this.activeMembershipService.membership.first().subscribe(membership => {
      this.inviteService.sendInvite(membership.organizationId, this.email).then(invite => {
        this.userService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        }).then(user => {
          this.memberService.create(invite.id, user.id).then(member => {
            if (!this.inviteMore) {
              this.router.navigate(['..', member.id], { relativeTo: this.route });
            }

            this.snackBar.open('User registered', null, <MdSnackBarConfig>{ duration: 2000 });
          });
        });
      });
    });
  }
}
