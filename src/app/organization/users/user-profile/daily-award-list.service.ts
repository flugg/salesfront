import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { DailyAward } from '../../../core/models/daily-award.model';
import { ObservableResourceList } from '../../../core/observable-resource-list';
import { DailyAwardService } from '../../../core/services/daily-award.service';
import { SelectedMembershipService } from './selected-membership.service';

@Injectable()
export class DailyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<DailyAward[]> = this.subject.asObservable();

  constructor(private selectedMembership: SelectedMembershipService,
              private dailyAwardService: DailyAwardService) {
    super();

    this.selectedMembership.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.dailyAwardService.getForMember(membership.id, limit, this.cursor))
          .subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
