import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export abstract class ObservableResource implements OnDestroy {
  protected snapshot: any = [];
  protected subject: ReplaySubject<any> = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.subject.unsubscribe();
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
