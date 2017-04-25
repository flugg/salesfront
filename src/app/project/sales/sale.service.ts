import { Injectable } from '@angular/core';
import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Sale } from '../../core/models/sale.model';

@Injectable()
export class SaleService {

  /**
   * Construct the service.
   */
  constructor(private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of the organization's users.
   */
  get(projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const sales = this.paginator.paginate(`projects/${projectId}/sales`, cursor);

    return sales.asObservable();
  }

  /**
   * Fetch an updating stream of the users belonging to a project.
   */
  getWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const users = this.paginator.paginate(`projects/${projectId}/sales`, cursor);

    return users.asObservable();
  }

  /**
   * Fetch updated sales from a team
   */
  getFromTeamWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const sales = this.paginator.paginate(`projects/${projectId}/sales`, cursor);

    return sales.asObservable();
  }

  /**
   * Fetch updated sales from a team
   */
  getFromUsersWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const sales = this.paginator.paginate(`projects/${projectId}/sales`, cursor);

    return sales.asObservable();
  }

  // TODO finish implementation of paginate methods required
  /**
   * Fetch updated sales from a team
   */
  findFromTeamWithUpdates(teamId: string, projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const sales = this.paginator.paginate(`projects/${projectId}/sales`, cursor, {team: teamId});

    return sales.asObservable();
  }

  /**
   * Fetch updated sales from a team
   */
  findFromUserWithUpdates(userId: string, projectId: string, cursor: BehaviorSubject<number>): Observable<Sale[]> {
    const sales = this.paginator.paginate(`projects/${projectId}/sales`, cursor, {user: userId});

    return sales.asObservable();
  }

}
