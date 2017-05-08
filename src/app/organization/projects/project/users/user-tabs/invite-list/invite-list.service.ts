import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { ActiveProjectService } from '../../../../../../core/active-project.service';
import { InviteService } from '../../invite.service';
import { Invite } from '../../../shared/invite.model';

@Injectable()
export class InviteListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of invites.
   */
  readonly invites: Observable<Invite[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private inviteService: InviteService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.inviteService.get(project.id, limit, this.cursor))
          .subscribe(invites => this.add(invites));
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