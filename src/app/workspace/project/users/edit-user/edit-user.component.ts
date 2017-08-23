import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { UserService } from '../../../../core/services/user.service';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { MemberService } from '../../../../core/services/member.service';
import { Member } from '../../../../core/models/member.model';
import { User } from '../../../../core/models/user.model';

@Component({
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  loading = true;
  member: Member;
  activeUser: User;
  date: Date;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private userService: UserService,
              private activeUserService: ActiveUserService,
              private memberService: MemberService) {}

  ngOnInit() {

    this.subscriptions.push(this.activeUserService.user.subscribe(user => {
      this.subscriptions.push(this.memberService.find(this.route.snapshot.parent.params['member']).subscribe(member => {
        this.member = member;
        this.activeUser = user;
        if (this.member.user.birthdate) {
          this.date = new Date(this.member.user.birthdate);
        }
        this.isAdmin = this.member.user.isAdmin;
        this.loading = false;
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit(firstName: string, lastName: string, email: string, phoneNumber: string, password?: string): void {
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber ? phoneNumber : null,
      birthdate: this.date ? moment(this.date).format('YYYY-MM-DD') : null,
      isAdmin: this.isAdmin
    };

    if (password) {
      user['password'] = password;
    }

    this.userService.update(this.member.userId, user).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('User updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
