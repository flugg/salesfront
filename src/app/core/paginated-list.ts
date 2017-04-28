import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PaginationResponse } from './utils/pagination-response';
import { ResourceList } from './resource-list';

export abstract class PaginatedList extends ResourceList {

  /**
   * The current cursor id.
   */
  protected cursor: string | null;

  /**
   * The cursor for the paginated messages.
   */
  paginator: BehaviorSubject<number>;

  /**
   * Constructs the service.
   */
  constructor(private limit: number = 15) {
    super();

    this.paginator = new BehaviorSubject(limit);
  }

  /**
   * Parses a pagination observable response.
   */
  pagination(pagination: Observable<PaginationResponse>): Observable<any> {
    return pagination.do(response => {
      this.setCursor(response.cursor.next);
    }).map(response => response.data);
  }

  /**
   * Adds a paginated data set to the observable list.
   */
  add(resources: any[]): void {
    this.snapshot.push(...resources);
    this.updateFromSnapshot();
  }

  /**
   * Loads more messages.
   */
  paginate(): void {
    this.paginator.next(this.limit);
  }

  /**
   * Indicates if all messages have been loaded.
   */
  isComplete(): boolean {
    return this.paginator.isStopped;
  }

  /**
   * Sets the current cursor id.
   */
  setCursor(cursor: string | null): void {
    this.cursor = cursor;

    if (cursor == null) {
      this.paginator.complete();
    }
  }
}
