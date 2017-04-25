import { Component, HostListener, Input, OnInit } from '@angular/core';

import { SidebarService } from '../../core/sidebar.service';
import { ObservableMedia } from '@angular/flex-layout';

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
  constructor(public sidebar: SidebarService,
              private media: ObservableMedia) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.media.subscribe(media => {
      if (this.mode === 'menu' && (media.mqAlias === 'xs' || media.mqAlias === 'sm')) {
        this.state = 'menu';
      } else {
        this.state = 'none';
      }
    });

    this.state = window.innerWidth >= 960 && this.mode === 'menu' ? 'none' : this.mode;
  }
}
