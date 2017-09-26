import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MdDrawerToggleResult, MdSidenav } from '@angular/material';

import { ScreenService } from '../core/screen.service';

@Injectable()
export class SidenavService {
  private sidenav: MdSidenav;

  constructor(private router: Router,
              private screen: ScreenService) {}

  set(sidenav: MdSidenav) {
    this.sidenav = sidenav;

    this.screen.asObservable().subscribe(breakpoint => this.setMode(this.resolveMode(breakpoint)));
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(() => this.close());
  }

  open(): Promise<MdDrawerToggleResult> {
    return this.sidenav.open();
  }

  close(): Promise<MdDrawerToggleResult> | void {
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
