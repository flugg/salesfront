import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/combineLatest';
import * as moment from 'moment';

import { SaleService } from '../../../shared/sale.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { MembershipListService } from './membership-list.service';
import { ActiveUserService } from '../../../../active-user.service';
import { Membership } from '../../../../shared/membership.model';
import { User } from '../../../../shared/user.model';

@Component({
  providers: [MembershipListService],
  templateUrl: 'add-sale.component.html',
  styleUrls: ['add-sale.component.scss']
})
export class AddSaleComponent implements OnInit, OnDestroy {

  /**
   * The quantity input value.
   */
  quantity = 1;

  /**
   * The date input value.
   */
  date: Date;

  /**
   * The time input value.
   */
  time = '12:00';

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Indicates if the user wants to keep adding sales.
   */
  addMore = false;

  /**
   * The logged in user.
   */
  user: User;

  /**
   * The id of the selected member to add sale for.
   */
  selectedMembership: string;

  /**
   * The id of the selected team to add sale for.
   */
  selectedTeam: string;

  /**
   * The list of memberships.
   */
  memberships: Membership[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private membershipList: MembershipListService,
              private activeUser: ActiveUserService,
              private activeMembership: ActiveMembershipService,
              private saleService: SaleService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.date = new Date();
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.membershipList.members
    ).subscribe(data => {
      [this.user, this.memberships] = data;
      this.memberships = this.memberships.filter(membership => membership.teamMembers.length);
      const member = this.memberships.find(membership => membership.userId === this.user.id);
      this.selectedMembership = member ? member.id : this.memberships[0].id;
      this.updateTeams();
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
  submit(quantity: number, date: Date, time: string) {
    const promises = [];
    const datetime = moment(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${time}`, 'YYYY-MM-DD HH:mm');

    this.activeMembership.membership.first().subscribe(membership => {
      for (let i = 0; i < quantity; i++) {
        promises.push(this.saleService.register(this.selectedTeam, datetime));
      }

      Promise.all(promises).then(() => {
        if (!this.addMore) {
          this.router.navigate(['projects', membership.projectId, 'sales']);
        }

        this.snackBar.open(`${quantity > 1 ? quantity + ' sales' : 'Sale' } added`, null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });
  }

  /**
   * Gets team members from the given membership id.
   */
  getTeamMembers(membershipId: string) {
    if (! this.memberships || ! membershipId) {
      return;
    }

    const membership = this.memberships.find(member => member.id === membershipId);
    return membership.teamMembers ? membership.teamMembers : null;
  }

  /**
   * Updates the teams select.
   */
  updateTeams() {
    const members = this.getTeamMembers(this.selectedMembership);

    if (members) {
      this.selectedTeam = members[0].id
    }
  }
}
