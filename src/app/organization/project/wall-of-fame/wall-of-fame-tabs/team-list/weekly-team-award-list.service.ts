import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { WeeklyAward } from '../../../../../core/models/weekly-award.model';
import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { WeeklyAwardService } from '../../../../../core/services/weekly-award.service';
import { ActiveProjectService } from '../../../../active-project.service';

@Injectable()
export class WeeklyTeamAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<WeeklyAward[]> = this.subject.asObservable();
  protected limit = 5;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private weeklyAwardService: WeeklyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.weeklyAwardService.teams(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
