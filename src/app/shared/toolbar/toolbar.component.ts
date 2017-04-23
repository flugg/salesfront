import { Component, HostListener, Input, OnInit } from '@angular/core';

import { SidebarService } from '../../core/sidebar.service';

@Component({
  selector: 'vmo-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /**
   * Indicates what state the toolbar is in.
   */
  state: string;

  /**
   * The title of the current page displayed on the toolbar.
   */
  @Input() title: number;

  /**
   * Indicates what mode the toolbar is in.
   */
  @Input() private mode: string;

  /**
   * Constructs the component.
   */
  constructor(public sidebar: SidebarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.state = window.innerWidth >= 768 && this.mode === 'menu' ? 'none' : this.mode;
  }

  /**
   * Event listener for window resizing.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 768 && this.mode === 'menu') {
      this.state = 'none';
    } else {
      this.state = this.mode;
    }
  }
}
