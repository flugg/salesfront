import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ScreenService {
  private screen: ReplaySubject<string> = new ReplaySubject(1);

  constructor(private media: ObservableMedia) {
    this.media.asObservable().subscribe(breakpoint => this.screen.next(breakpoint.mqAlias));
  }

  asObservable(): Observable<string> {
    return this.screen.asObservable();
  }
}
