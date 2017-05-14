import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ScreenService {

  /**
   * A subject holding the current breakpoint alias.
   */
  private screen: ReplaySubject<string> = new ReplaySubject(1);

  /**
   * Constructs the service.
   */
  constructor(private media: ObservableMedia) {
    this.media.asObservable().subscribe(breakpoint => this.screen.next(breakpoint.mqAlias));
  }

  /**
   * Retrieves the observable of the screen subject.
   */
  asObservable(): Observable<string> {
    return this.screen.asObservable();
  }
}
