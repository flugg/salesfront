import { Injectable } from '@angular/core';
import { MdDrawerToggleResult, MdSidenav } from '@angular/material';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ScreenService } from '../core/screen.service';

@Injectable()
export class SidenavService {
  private sidenav: MdSidenav;

  constructor(private screen: ScreenService) {}

  set(sidenav: MdSidenav) {
    this.sidenav = sidenav;

    this.screen.asObservable().subscribe(breakpoint => this.setMode(this.resolveMode(breakpoint)));
  }

  open(): Promise<MdDrawerToggleResult> {
    return this.sidenav.open();
  }

  close(): Promise<MdDrawerToggleResult> | void {
    if (this.sidenav.mode !== 'side') {
      return this.sidenav.close();
    }
  }

  closeIfOver(): Observable<boolean> {
    if (!this.sidenav || this.sidenav.mode !== 'over' || !this.sidenav.opened) {
      return Observable.of(true);
    }

    const isClosed = new Subject<boolean>();
    this.sidenav.onClose.first().subscribe(() => {
      isClosed.next(true);
    });

    this.close();

    return isClosed.asObservable();
  }

  private setMode(mode: 'over' | 'push' | 'side'): void {
    this.sidenav.mode = mode;

    if (mode === 'over') {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  private resolveMode(breakpoint: string): 'over' | 'push' | 'side' {
    return breakpoint === 'xs' || breakpoint === 'sm' ? 'over' : 'side';
  }
}
