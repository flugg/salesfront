import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { TeamLeader } from '../../../shared/team-leader.model';

@Injectable()
export class LeaderListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of team leaders.
   */
  readonly leaders: Observable<TeamLeader[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor() {
    super();

    //
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}