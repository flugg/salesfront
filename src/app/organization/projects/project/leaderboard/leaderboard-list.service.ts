import { Injectable, OnDestroy } from '@angular/core';
import { ObservableResourceList } from '../../../../core/sockets/observable-resource-list';
import { Observable } from 'rxjs/Observable';
import { ActiveProjectService } from '../../../../core/active-project.service';
import { SocketApiService } from '../../../../core/sockets/socket-api.service';
import { LeaderboardService } from './leaderboard.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class LeaderboardListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly sales: Observable<any[]> = this.subject.asObservable();

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
