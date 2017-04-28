import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export abstract class ResourceList implements OnDestroy {

  /**
   * A snapshot of the list of resources.
   */
  protected snapshot: any[] = [];

  /**
   * The resource list subject.
   */
  protected subject: ReplaySubject<any[]> = new ReplaySubject(1);

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  /**
   * Sets the observable list of conversations from the snapshot.
   */
  updateFromSnapshot() {
    this.subject.next(this.snapshot);
  }
}
