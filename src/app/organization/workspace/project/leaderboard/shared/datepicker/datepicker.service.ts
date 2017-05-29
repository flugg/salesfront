import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatepickerService {

  /**
   * After date.
   */
  after: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  /**
   * Before date.
   */
  before: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  /**
   * Indicates if the datepicker should be visible.
   */
  visible = false;

  /**
   * Toggles the visibility.
   */
  toggle() {
    this.visible = !this.visible;
  }

  /**
   * Sets the after date.
   */
  setAfter(after) {
    this.after.next(after);
  }

  /**
   * Sets the before date.
   */
  setBefore(before) {
    this.before.next(before);
  }
}