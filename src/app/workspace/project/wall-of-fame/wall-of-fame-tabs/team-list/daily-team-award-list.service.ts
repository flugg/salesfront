import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { ActiveProjectService } from '../../../../active-project.service';
import { DailyAwardService } from '../../../../../core/services/daily-award.service';
import { DailyAward } from '../../../../../core/models/daily-award.model';

@Injectable()
export class DailyTeamAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<DailyAward[]> = this.subject.asObservable();
  protected limit = 7;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private dailyAwardService: DailyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.dailyAwardService.teams(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
