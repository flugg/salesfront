import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { UserService } from '../../../../core/services/user.service';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { Member } from '../../../../core/models/member.model';
import { User } from '../../../../core/models/user.model';
import { SelectedMembershipService } from '../user-profile/selected-membership.service';

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
              private dialog: MdDialog,
              private userService: UserService,
              private activeUserService: ActiveUserService,
              private selectedMembershipService: SelectedMembershipService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUserService.user,
      this.selectedMembershipService.membership
    ).subscribe(data => {
      [this.activeUser, this.member] = data;
      this.isAdmin = this.member.user.isAdmin;

      if (this.member.user.birthdate) {
        this.date = new Date(this.member.user.birthdate);
      }

      if (this.member.deletedAt) {
        this.router.navigate(['..'], { relativeTo: this.route });
      }

      this.loading = false;
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

  removeUser() {
    this.dialog.open(DeleteConfirmationComponent, <MdDialogConfig>{
      data: {
        member: this.member
      }
    });
  }
}
