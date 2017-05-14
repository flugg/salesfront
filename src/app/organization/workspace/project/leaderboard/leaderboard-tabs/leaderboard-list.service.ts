import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { LeaderboardService } from '../shared/leaderboard.service';
import { User } from '../../../../shared/user.model';
import { Team } from '../../shared/team.model';

@Injectable()
export class LeaderboardListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly sales: Observable<User[] | Team[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private leaderboardService: LeaderboardService,
              private route: ActivatedRoute) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.leaderboardService.get(project.id, this.route.snapshot.url[0].path, limit, this.cursor))
            .subscribe(sales => this.add(sales));
      });
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}
