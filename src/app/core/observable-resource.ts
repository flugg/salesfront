import { OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

export abstract class ObservableResource implements OnDestroy {
  protected snapshot: any = [];
  protected subject: ReplaySubject<any> = new ReplaySubject(1);
  protected socketSubscription: Subscription;

  ngOnDestroy(): void {
    this.subject.unsubscribe();

    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  protected set(resource: any) {
    this.snapshot = resource;
    this.updateFromSnapshot();
  }

  protected updateFromSnapshot() {
    if (!this.subject.isStopped) {
      this.subject.next(this.snapshot);
    }
  }
}
