import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';

import { PaginationResponse } from './pagination-response';

export abstract class ObservableResourceList implements OnDestroy {
  protected snapshot: any[] = [];
  protected subject: ReplaySubject<any[]> = new ReplaySubject(1);
  protected limit = 15;
  protected cursor: string | null;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  ngOnDestroy(): void {
    this.subject.unsubscribe();
    this.paginator.unsubscribe();
  }

  paginate(): void {
    this.paginator.next(this.limit);
  }

  isComplete(): boolean {
    return this.paginator.isStopped;
  }

  protected pagination(pagination: Observable<PaginationResponse>): Observable<any> {
    return pagination.do(response => {
      this.setCursor(response.cursor.next);
    }).map(response => response.data);
  }

  protected setCursor(cursor: string | null): void {
    this.cursor = cursor;

    if (cursor == null && ! this.paginator.isStopped) {
      this.paginator.complete();
    }
  }

  protected add(resources: any[]): void {
    this.snapshot.push(...resources.filter(resource => {
      return ! this.snapshot.find(item => item.id === resource.id);
    }));

    this.updateFromSnapshot();
  }

  protected set(resources: any[]): void {
    this.snapshot = resources;
    this.updateFromSnapshot();
  }

  protected updateFromSnapshot() {
    if (!this.subject.isStopped) {
      this.subject.next(this.snapshot);
    }
  }
}
