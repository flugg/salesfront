import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { UserService } from '../../../../shared/user.service';
import { MembershipService } from '../../../../shared/membership.service';
import { Membership } from '../../../../shared/membership.model';

@Component({
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected member.
   */
  member: Membership;

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
              private membershipService: MembershipService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.membershipService.find(this.route.snapshot.parent.params['member']).subscribe(member => {
      this.member = member;
      if (this.member.user.birthdate) {
        this.date = new Date(this.member.user.birthdate);
      }
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
   * Submits the form.
   */
  submit(firstName: string, lastName: string, email: string, phoneNumber: string): void {
    console.log(moment(this.date).format('YYYY-MM-DD'));
    this.userService.update(this.member.userId, { firstName, lastName, email, phoneNumber, birthdate: moment(this.date).format('YYYY-MM-DD') }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
