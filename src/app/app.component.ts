import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './core/auth/auth.service';
import { User } from './core/models/user.model';
import { SidebarService } from './core/sidebar.service';
import { ObservableMedia } from '@angular/flex-layout';
import { ActiveProjectService } from './core/active-project.service';

@Component({
  selector: 'vmo-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * The currently logged in user.
   */
  currentUser: Observable<User>;

  /**
   * The active project id.
   */
  projectId: Observable<string>;

  /**
   * The navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'forum' },
    { name: 'Leaderboard', route: 'leaderboard', icon: 'star' },
    /* { name: 'Budgets', route: 'budgets', icon: 'track_changes' }, */
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Products', route: 'products', icon: 'shopping_basket' },
    { name: 'Departments', route: 'departments', icon: 'domain' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Users', route: 'users', icon: 'person' },
    { name: 'Settings', route: 'settings', icon: 'settings' }
  ];

  /**
   * The mode of the sidenav.
   */
  sidebarMode = 'over';

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') sidenav: MdSidenav;

  /**
   * Constructs the component.
   */
  constructor(private sidebar: SidebarService,
              private auth: AuthService,
              private activeProject: ActiveProjectService,
              private router: Router,
              private media: ObservableMedia) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.projectId = this.activeProject.get();

    this.projectId.subscribe(projectId => {if (projectId) {
      this.media.subscribe(media => {
        if (media.mqAlias === 'xs' || media.mqAlias === 'sm') {
          this.sidebarMode = 'over';
          this.sidenav.close();
        } else {
          this.sidebarMode = 'side';
          this.sidenav.open();
        }
      });

      this.sidebar.isOpened.subscribe(open => {
        if (open) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      });

      this.sidebarMode = window.innerWidth < 960 ? 'over' : 'side';
      if (this.sidebarMode === 'side') {
        this.sidenav.open();
      }

      this.router.events.filter(event => event instanceof NavigationEnd).subscribe(a => {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }
      });
    }});
  }

  /**
   * Logs the user out of the application and redirects to login screen.
   */
  logout() {
    this.sidenav.close().then(() => {
      this.auth.logout();
      this.router.navigate(['login']);
    });
  }
}
