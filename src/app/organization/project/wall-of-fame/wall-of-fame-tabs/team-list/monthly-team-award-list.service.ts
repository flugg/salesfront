import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { MonthlyAward } from '../../../../../core/models/monthly-award.model';
import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { MonthlyAwardService } from '../../../../../core/services/monthly-award.service';
import { ActiveProjectService } from '../../../../active-project.service';

@Injectable()
export class MonthlyTeamAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<MonthlyAward[]> = this.subject.asObservable();
  protected limit = 6;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private monthlyAwardService: MonthlyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.monthlyAwardService.teams(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
