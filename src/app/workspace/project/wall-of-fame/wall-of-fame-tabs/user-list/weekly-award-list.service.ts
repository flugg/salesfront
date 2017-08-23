import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { ActiveProjectService } from '../../../../active-project.service';
import { WeeklyAwardService } from '../../../../../core/services/weekly-award.service';
import { WeeklyAward } from '../../../../../core/models/weekly-award.model';

@Injectable()
export class WeeklyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<WeeklyAward[]> = this.subject.asObservable();
  protected limit = 6;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private weeklyAwardService: WeeklyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.weeklyAwardService.get(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
