import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { SidebarService } from './sidebar.service';
import { MdSidenavToggleResult } from '@angular/material';

@Injectable()
export class SidebarResolver implements Resolve<MdSidenavToggleResult> {

  /**
   * Constructs the route resolver.
   */
  constructor(private sidebar: SidebarService) {}

  /**
   * Resolves the active project.
   */
  resolve(): Promise<any> {
    return this.sidebar.enable();
  }
}