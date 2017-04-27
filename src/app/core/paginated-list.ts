import { Subject } from 'rxjs/Subject';

export abstract class PaginatedList {

  /**
   * The number of items to load for every paginate.
   */
  private limit: number;

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
  constructor(limit: number = 15) {
    console.log('called constructor of PaginatedList');
    this.limit = limit;
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
