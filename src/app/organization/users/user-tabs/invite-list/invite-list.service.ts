import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Invite } from '../../../../core/models/invite.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { InviteService } from '../../../../core/services/invite.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';

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