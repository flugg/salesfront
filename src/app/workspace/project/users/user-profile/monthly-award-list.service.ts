import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { SelectedMembershipService } from './selected-membership.service';
import { MonthlyAwardService } from '../../../../core/services/monthly-award.service';
import { MonthlyAward } from '../../../../core/models/monthly-award.model';

@Injectable()
export class MonthlyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<MonthlyAward[]> = this.subject.asObservable();

  constructor(private selectedMembership: SelectedMembershipService,
              private monthlyAwardService: MonthlyAwardService) {
    super();

    this.selectedMembership.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.monthlyAwardService.getForMember(membership.id, limit, this.cursor))
            .subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
