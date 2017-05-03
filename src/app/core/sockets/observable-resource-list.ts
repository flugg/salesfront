import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { PaginationResponse } from '../http/pagination-response';

export abstract class ObservableResourceList implements OnDestroy {

  /**
   * A snapshot of the list of resources.
   */
  protected snapshot: any[] = [];

  /**
   * The resource list subject.
   */
  protected subject: ReplaySubject<any[]> = new ReplaySubject(1);

  /**
   * The number of resources to fetch when paginating.
   */
  protected limit = 15;

  /**
   * The current cursor id.
   */
  protected cursor: string | null;

  /**
   * The cursor for the paginated resources.
   */
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  /**
   * Loads more resources.
   */
  paginate(): void {
    this.paginator.next(this.limit);
  }

  /**
   * Indicates if all resources have been loaded.
   */
  isComplete(): boolean {
    return this.paginator.isStopped;
  }

  /**
   * Sets the observable list of resources to the current snapshot.
   */
  protected updateFromSnapshot() {
    if (!this.subject.isStopped) {
      this.subject.next(this.snapshot);
    }
  }

  /**
   * Parses a pagination observable response.
   */
  protected pagination(pagination: Observable<PaginationResponse>): Observable<any> {
    return pagination.do(response => {
      this.setCursor(response.cursor.next);
    }).map(response => response.data);
  }

  /**
   * Adds a paginated data set to the observable list.
   */
  protected add(resources: any[]): void {
    this.snapshot.push(...resources);
    this.updateFromSnapshot();
  }

  /**
   * Sets the current cursor id.
   */
  protected setCursor(cursor: string | null): void {
    this.cursor = cursor;

    if (cursor == null) {
      this.paginator.complete();
    }
  }
}
