import { Component, Input } from '@angular/core';

import { SidebarService } from '../../core/sidebar.service';

@Component({
  selector: 'vmo-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  /**
   * Indicates what mode the toolbar is in.
   */
  @Input() mode: number;

  /**
   * The title of the current page displayed on the toolbar.
   */
  @Input() title: number;

  /**
   * Constructs the component.
   */
  constructor(public sidebar: SidebarService) {}
}
