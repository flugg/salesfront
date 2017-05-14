import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ActiveSidebarService } from '../../active-sidebar.service';
import { ScreenService } from '../../../../core/screen.service';

@Component({
  selector: 'vmo-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  /**
   * Indicates what state the toolbar is in.
   */
  state: string;

  /**
   * The title of the current page displayed on the toolbar.
   */
  @Input() title: number;

  /**
   * Indicates if the toolbar include tabs.
   */
  @Input() tabs = false;

  /**
   * Indicates what mode the toolbar is in.
   */
  @Input() private mode: string;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public sidebar: ActiveSidebarService,
              private screen: ScreenService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.screen.asObservable().subscribe(breakpoint => {
      if (this.mode === 'menu' && (breakpoint === 'xs' || breakpoint === 'sm')) {
        this.state = 'menu';
      } else {
        this.state = 'none';
      }
    }));

    this.state = window.innerWidth >= 960 && this.mode === 'menu' ? 'none' : this.mode;
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
