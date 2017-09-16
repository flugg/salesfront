import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/combineLatest';
import * as moment from 'moment';

import { SaleService } from '../../../../core/services/sale.service';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { ActiveProjectService } from '../../../active-project.service';
import { MemberListService } from './member-list.service';
import { TeamListService } from './team-list.service';
import { User } from '../../../../core/models/user.model';
import { Team } from '../../../../core/models/team.model';

@Component({
  providers: [MemberListService, TeamListService],
  templateUrl: 'add-sale.component.html',
  styleUrls: ['add-sale.component.scss']
})
export class AddSaleComponent implements OnInit, OnDestroy {
  loading = true;
  pending = false;
  quantity = 1;
  date: Date;
  time: string;
  addMore = false;
  user: User;
  selectedTeam: string;
  selectedTeamMember: string;
  teams: Team[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private teamList: TeamListService,
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService,
              private saleService: SaleService) {}

  ngOnInit(): void {
    this.date = new Date();
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.teamList.teams
    ).subscribe(data => {
      [this.user, this.teams] = data;
      if (this.teams.length) {
        this.selectedTeam = this.teams[0].id;
        this.updateSelectedMember();
      }
      this.time = moment().format('HH:mm');
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit(quantity: number, date: Date, time: string) {
    this.pending = true;
    const promises = [];
    const datetime = moment(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${time}`, 'YYYY-MM-DD HH:mm');

    this.activeProject.project.first().subscribe(project => {
      for (let i = 0; i < quantity; i++) {
        promises.push(this.saleService.register(this.selectedTeamMember, datetime));
      }

      Promise.all(promises).then(() => {
        if (!this.addMore) {
          this.router.navigate(['..'], { relativeTo: this.route });
        }

        this.pending = false;
        this.snackBar.open(`${quantity > 1 ? quantity + ' sales' : 'Sale' } added`, null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });
  }

  getMembers() {
    if (this.teams && this.teams.find(team => team.id === this.selectedTeam)) {
      return this.teams.find(team => team.id === this.selectedTeam).members;
    }
  }

  updateSelectedMember() {
    this.selectedTeamMember = this.getMembers()[0].id;
  }
}
