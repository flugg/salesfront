import { Injectable } from '@angular/core';
import { MdSidenav, MdSidenavToggleResult } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

  /**
   * The sidenav element.
   */
  private sidenav: MdSidenav;

  /**
   * The mode of the sidenav.
   */
  private mode = new BehaviorSubject<'over' | 'push' | 'side'>('over');

  /**
   * Indicates if the sidebar is disabled.
   */
  private disabled = false;

  /**
   * Constructs the service.
   */
  constructor(private media: ObservableMedia) {
    this.media.asObservable().subscribe(breakpoint => {
      this.mode.next(this.resolveMode(breakpoint.mqAlias));
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
    return this.sidenav.open();
  }

  /**
   * Closes the sidenav, and return a Promise that will resolve when it's fully closed.
   */
  close(): Promise<MdSidenavToggleResult> {
    return this.sidenav.close();
  }

  /**
   * Enables the sidebar and opens it if the mode is side-based.
   */
  enable(): Promise<MdSidenavToggleResult | null> {
    this.disabled = false;
    return this.open();
  }

  /**
   * Disables the sidebar and closes it if open.
   */
  disable(): Promise<MdSidenavToggleResult | null> {
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
