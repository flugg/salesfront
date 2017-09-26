import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { WeeklyAward } from '../../../core/models/weekly-award.model';
import { ObservableResourceList } from '../../../core/observable-resource-list';
import { WeeklyAwardService } from '../../../core/services/weekly-award.service';
import { SelectedMembershipService } from './selected-membership.service';

@Injectable()
export class WeeklyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<WeeklyAward[]> = this.subject.asObservable();

  constructor(private selectedMembership: SelectedMembershipService,
              private weeklyAwardService: WeeklyAwardService) {
    super();

    this.selectedMembership.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.weeklyAwardService.getForMember(membership.id, limit, this.cursor))
          .subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
