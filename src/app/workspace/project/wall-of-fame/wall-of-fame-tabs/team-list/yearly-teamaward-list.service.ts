import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { ActiveProjectService } from '../../../../active-project.service';
import { YearlyAwardService } from '../../../../../core/services/yearly-award.service';
import { YearlyAward } from '../../../../../core/models/yearly-award.model';

@Injectable()
export class YearlyTeamAwardListService extends ObservableResourceList implements OnDestroy {
  readonly awards: Observable<YearlyAward[]> = this.subject.asObservable();
  protected limit = 7;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private activeProject: ActiveProjectService,
              private yearlyAwardService: YearlyAwardService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.yearlyAwardService.teams(project.id, limit, this.cursor)).subscribe(sales => this.add(sales));
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
