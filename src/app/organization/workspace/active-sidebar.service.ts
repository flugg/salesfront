import { Injectable } from '@angular/core';
import { MdSidenav, MdSidenavToggleResult } from '@angular/material';

@Injectable()
export class ActiveSidebarService {

  /**
   * A subject holding the Angular Matieral sidenav element.
   */
  private sidenav: MdSidenav;

  /**
   * Pushes the sidenav element into the subject.
   */
  setSidenav(sidenav: MdSidenav) {
    this.sidenav = sidenav;
  }

  /**
   * Opens the sidebar.
   */
  open(): Promise<MdSidenavToggleResult> {
    return this.sidenav.open();
  }

  /**
   * Closes the sidebar.
   */
  close(): Promise<MdSidenavToggleResult> {
    return this.sidenav.close();
  }
}
