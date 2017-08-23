import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SidenavService } from '../../sidenav.service';
import { ScreenService } from '../../../core/screen.service';
import { ActiveProjectService } from '../../active-project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'vmo-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() title: number;
  @Input() tabs = false;
  @Input() mode: string;

  loading = true;
  state: string;
  project: Project | null;

  private subscriptions: Subscription[] = [];

  constructor(public sidebar: SidenavService,
              private screen: ScreenService,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit() {
    this.activeProjectService.project.subscribe(project => {
      this.project = project;
      this.loading = false;
    });

    this.subscriptions.push(this.screen.asObservable().subscribe(breakpoint => {
      if (this.mode === 'menu') {
        if (breakpoint === 'xs' || breakpoint === 'sm') {
          this.state = 'menu';
        } else {
          this.state = 'none';
        }
      }
    }));

    this.state = window.innerWidth >= 960 && this.mode === 'menu' ? 'none' : this.mode;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
