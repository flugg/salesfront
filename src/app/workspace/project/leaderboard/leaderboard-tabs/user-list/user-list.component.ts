import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { DatepickerService } from '../../shared/datepicker/datepicker.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { MemberListService } from './member-list.service';
import { Member } from '../../../../../core/models/member.model';
import { Project } from '../../../../../core/models/project.model';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  members: Member[];
  total: number;

  private subscriptions: Subscription[] = [];

  constructor(public datepicker: DatepickerService,
              private activeProjectService: ActiveProjectService,
              private memberListService: MemberListService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.memberListService.members
    ).subscribe(data => {
      [this.project, this.members] = data;
      this.total = this.calculateTotal(this.members);
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private calculateTotal(members: Member[]): number {
    return members.reduce((value, member) => value + member.value, 0);
  }
}
