import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { AuthService } from './core/auth/auth.service';
import { SidebarService } from './core/sidebar/sidebar.service';
import { ActiveProjectService } from './core/active-project.service';
import { ActiveUserService } from './core/auth/active-user.service';
import { Project } from './core/project.model';
import { User } from './core/user.model';

@Component({
  selector: 'vmo-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The active project.
   */
  project: Project;

  /**
   * The mode of the sidenav.
   */
  sidebarMode = 'over';

  /**
   * The navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'forum' },
    { name: 'Leaderboard', route: 'leaderboard', icon: 'star' },
    /* { name: 'Budgets', route: 'budgets', icon: 'track_changes' }, */
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Products', route: 'products', icon: 'shopping_basket' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Users', route: 'users', icon: 'person' },
    { name: 'Settings', route: 'settings', icon: 'settings' }
  ];

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') private sidenav: MdSidenav;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private media: ObservableMedia,
              private sidebar: SidebarService,
              private auth: AuthService,
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    Observable.combineLatest(
      this.activeUser.user,
      this.activeProject.project
    ).subscribe(data => {
      [this.user, this.project] = data;
      this.loading = this.user == null || this.project == null;
    });

    this.sidebar.setSidenav(this.sidenav);
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
