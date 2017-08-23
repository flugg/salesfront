import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatepickerService {
  range: BehaviorSubject<Date[]> = new BehaviorSubject([new Date(), new Date()]);
  visible = false;

  toggle() {
    this.visible = !this.visible;
  }

  set(after, before) {
    this.range.next([after, before]);
  }
}