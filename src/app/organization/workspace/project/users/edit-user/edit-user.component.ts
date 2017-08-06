import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { UserService } from '../../../../shared/user.service';
import { MembershipService } from '../../../../shared/membership.service';
import { Membership } from '../../../../shared/membership.model';
import { ActiveUserService } from '../../../../active-user.service';
import { User } from '../../../../shared/user.model';

@Component({
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  /**
   * The admin flag checkbox.
   */
  isAdmin: boolean;

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected member.
   */
  member: Membership;

  /**
   * The active user.
   */
  activeUser: User;

  /**
   * The date input value.
   */
  date: Date;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private activeUserService: ActiveUserService,
              private membershipService: MembershipService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {

    this.subscriptions.push(this.activeUserService.user.subscribe(user => {
      this.subscriptions.push(this.membershipService.find(this.route.snapshot.parent.params['member']).subscribe(member => {
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

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Submits the form.
   */
  submit(firstName: string, lastName: string, email: string, phoneNumber: string): void {
    this.userService.update(this.member.userId, {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber ? phoneNumber : null,
      birthdate: this.date ? moment(this.date).format('YYYY-MM-DD') : null,
      isAdmin: this.isAdmin
    }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
