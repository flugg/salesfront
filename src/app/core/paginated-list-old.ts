import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { PaginationResponse } from './utils/pagination-response';
import { ResourceList } from './resource-list';

export abstract class PaginatedListOld {

  /**
   * The current cursor id.
   */
  protected cursor: string | null;

  /**
   * The cursor for the paginated messages.
   */
  paginator: Subject<number> = new Subject();

  /**
   * Constructs the service.
   */
  constructor(private limit: number = 15) {

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
