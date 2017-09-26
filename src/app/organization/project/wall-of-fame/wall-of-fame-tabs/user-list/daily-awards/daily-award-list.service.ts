import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DailyAward } from '../../../../../../core/models/daily-award.model';
import { ObservableResourceList } from '../../../../../../core/observable-resource-list';
import { DailyAwardService } from '../../../../../../core/services/daily-award.service';
import { ActiveProjectService } from '../../../../../active-project.service';

@Injectable()
export class DailyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<DailyAward[]> = this.subject.asObservable();
  protected limit = 30;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private dailyAwardService: DailyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.dailyAwardService.get(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
