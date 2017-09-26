import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { InviteService } from '../../../core/services/invite.service';
import { MemberService } from '../../../core/services/member.service';
import { UserService } from '../../../core/services/user.service';
import { ActiveMembershipService } from '../../active-membership.service';

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
  pending = false;
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

  submit(form) {
    this.pending = true;
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

            form.reset();
            this.pending = false;
            this.isAdmin = false;
            this.snackBar.open('User registered', null, <MdSnackBarConfig>{ duration: 2000 });
          });
        });
      });
    });
  }
}
