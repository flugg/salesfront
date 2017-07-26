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
import { TeamListService } from './team-list.service';
import { Team } from '../../shared/team.model';
import { TeamMember } from '../../../../shared/team-member.model';

@Component({
  providers: [MembershipListService, TeamListService],
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
   * The id of the selected team to add sale for.
   */
  selectedTeam: string;

  /**
   * The id of the selected team member to add sale for.
   */
  selectedTeamMember: string;

  /**
   * A list of teams.
   */
  teams: Team[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private teamList: TeamListService,
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
      this.teamList.teams
    ).subscribe(data => {
      [this.user, this.teams] = data;
      this.selectedTeam = this.teams[0].id;
      this.updateSelectedMember();
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
    const datetime = moment(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${time}`, 'YYYY-MM-DD HH:mm');

    this.activeMembership.membership.first().subscribe(membership => {
      for (let i = 0; i < quantity; i++) {
        promises.push(this.saleService.register(this.selectedTeamMember, datetime));
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
   * Gets a list of members for the currently selected team.
   */
  getMembers() {
    if (this.teams) {
      return this.teams.find(team => team.id === this.selectedTeam).members;
    }
  }

  /**
   * Updates the selected team member.
   */
  updateSelectedMember() {
    this.selectedTeamMember = this.getMembers()[0].id;
  }
}
