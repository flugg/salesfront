import { Injectable } from '@angular/core';
import { MdSidenav, MdSidenavToggleResult } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class SidebarService {

  /**
   * The sidenav element.
   */
  private sidenav: MdSidenav;

  /**
   * The mode of the sidenav.
   */
  private mode = new BehaviorSubject<'over' | 'side'>('over');

  /**
   * Indicates if the sidebar is disabled.
   */
  private disabled = false;

  /**
   * Constructs the service.
   */
  constructor(private media: ObservableMedia,
              private router: Router) {
    this.media.asObservable().subscribe(breakpoint => {
      this.mode.next(this.resolveMode(breakpoint.mqAlias));
    });

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      if (this.mode.value === 'over') {
        this.close();
      }
    });
  }

  /**
   * Sets the sidenav.
   */
  setSidenav(sidenav: MdSidenav) {
    this.sidenav = sidenav;
    this.mode.subscribe(mode => this.setMode(mode));
  }

  /**
   * Opens the sidenav, and return a Promise that will resolve when it's fully opened.
   */
  open(): Promise<MdSidenavToggleResult | null> {
    if (this.sidenav) {
      return this.sidenav.open();
    }
  }

  /**
   * Closes the sidenav, and return a Promise that will resolve when it's fully closed.
   */
  close(): Promise<MdSidenavToggleResult> {
    if (this.sidenav) {
      return this.sidenav.close();
    }
  }

  /**
   * Enables the sidebar and opens it if the mode is side-based.
   */
  enable(): Promise<MdSidenavToggleResult | null> {
    this.disabled = false;

    return this.mode.value === 'side' ? this.open() : Promise.resolve(null);
  }

  /**
   * Disables the sidebar and closes it if open.
   */
  disable(): Promise<MdSidenavToggleResult> {
    this.disabled = true;
    return this.close();
  }

  /**
   * Indicates if the sidebar is currently in an open state.
   */
  isOpen(): boolean {
    return this.sidenav.opened;
  }

  /**
   * Resolves the sidebar mode from a breakpoint alias.
   */
  private resolveMode(breakpoint: string) {
    return breakpoint === 'xs' || breakpoint === 'sm' ? 'over' : 'side';
  }

  /**
   * Sets the mode of the sidebar.
   */
  private setMode(mode) {
    if (mode !== this.sidenav.mode) {
      mode === 'over' ? this.close() : this.open();
    }

    this.sidenav.mode = mode;
  }
}
