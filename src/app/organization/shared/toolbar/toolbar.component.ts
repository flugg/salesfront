import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Project } from '../../../core/models/project.model';
import { ScreenService } from '../../../core/screen.service';
import { UrlService } from '../../../core/url.service';
import { ActiveProjectService } from '../../active-project.service';
import { SidenavService } from '../../sidenav.service';

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
              private router: Router,
              private route: ActivatedRoute,
              private urlService: UrlService,
              private location: Location,
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

  goBack(): void {
    if (!this.urlService.previous || this.urlService.previous.url.includes(this.urlService.current.url)) {
      this.router.navigate(['..'], { relativeTo: this.route });
    } else if (this.stripLastSegment(this.urlService.previous.url) === this.stripLastSegment(this.urlService.current.url)) {
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      this.location.back();
    }
  }

  private stripLastSegment(url: string): string {
    const segments = url.split('/');
    segments.pop();

    return segments.join('/');
  }
}
