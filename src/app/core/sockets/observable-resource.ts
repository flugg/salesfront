import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export abstract class ObservableResource implements OnDestroy {

  /**
   * A snapshot of the list of resources.
   */
  protected snapshot: any = [];

  /**
   * The resource list subject.
   */
  protected subject: ReplaySubject<any> = new ReplaySubject(1);

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  /**
   * Sets the observable resource and takes a snapshot.
   */
  protected set(resource: any) {
    this.snapshot = resource;
    this.updateFromSnapshot();
  }

  /**
   * Updates the observable list of conversations from the snapshot.
   */
  protected updateFromSnapshot() {
    if (!this.subject.isStopped) {
      this.subject.next(this.snapshot);
    }
  }
}
