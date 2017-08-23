import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MdSidenav, MdSidenavToggleResult } from '@angular/material';

import { ScreenService } from '../core/screen.service';

@Injectable()
export class SidenavService {
  private sidenav: MdSidenav;

  constructor(private router: Router,
              private screen: ScreenService) {}

  set(sidenav: MdSidenav) {
    this.sidenav = sidenav;

    this.screen.asObservable().subscribe(breakpoint => this.setMode(this.resolveMode(breakpoint)));
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => this.close());
  }

  open(): Promise<MdSidenavToggleResult> {
    return this.sidenav.open();
  }

  close(): Promise<MdSidenavToggleResult> | void {
    if (this.sidenav.mode !== 'side') {
      return this.sidenav.close();
    }
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
