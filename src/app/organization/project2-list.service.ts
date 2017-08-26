import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { ObservableResourceList } from '../core/observable-resource-list';
import { SocketApiService } from '../core/socket-api.service';
import { LeaderboardService } from '../core/services/leaderboard.service';
import { ActiveMembershipService } from './active-membership.service';
import { Project } from '../core/models/project.model';
import { Sale } from '../core/models/sale.model';

@Injectable()
export class ProjectListService extends ObservableResourceList implements OnDestroy {
  readonly projects: Observable<Project[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private leaderboardService: LeaderboardService) {
    super();

    this.activeMembershipService.membership.subscribe(membership => {
      this.leaderboardService.projects(membership.organizationId, moment().startOf('day'), moment().endOf('day')).subscribe(projects => {
        this.set(projects);
      });

      this.sockets.listenForOrganization(membership.organizationId, {
        'project_created': project => this.addProject(project),
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addProject(project: Project) {
    this.snapshot.push(project);
    this.updateFromSnapshot();
  }

  private addSale(sale: Sale) {
    this.snapshot.find(item => item.id === sale.projectId).value += 1;
    this.updateFromSnapshot();
  }

  private removeSale(sale: Sale) {
    this.snapshot.find(item => item.id === sale.projectId).value -= 1;
    this.updateFromSnapshot();
  }
}