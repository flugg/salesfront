import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { YearlyAward } from '../../../../../core/models/yearly-award.model';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { YearlyAwardService } from '../../../../../core/services/yearly-award.service';
import { ActiveProjectService } from '../../../../active-project.service';

@Injectable()
export class YearlyAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<YearlyAward[]> = this.subject.asObservable();
  protected limit = 5;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private yearlyAwardService: YearlyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.yearlyAwardService.get(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
