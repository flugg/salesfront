import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { ActiveProjectService } from '../../../../active-project.service';
import { MonthlyAwardService } from '../../../../../core/services/monthly-award.service';
import { MonthlyAward } from '../../../../../core/models/monthly-award.model';

@Injectable()
export class MonthlyTeamAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<MonthlyAward[]> = this.subject.asObservable();
  protected limit = 7;
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
