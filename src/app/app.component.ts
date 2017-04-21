import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './core/auth/auth.service';
import { User } from './core/models/user.model';
import { SidebarService } from './core/sidebar.service';
import { ProjectService } from './project/project.service';

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
   * The navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'question_answer' },
    { name: 'Scoreboard', route: 'scoreboard', icon: 'subject' },
    { name: 'Budgets', route: 'budgets', icon: 'track_changes' },
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Users', route: 'users', icon: 'person' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Settings', route: 'settings', icon: 'settings' }
  ];

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') sidenav: MdSidenav;

  /**
   * Constructs the component.
   */
  constructor(private sidebar: SidebarService,
              private auth: AuthService,
              private projectService: ProjectService,
              private router: Router) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.sidebar.isOpened.subscribe(open => open ? this.sidenav.open() : this.sidenav.close());

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      this.sidenav.close();
    });
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
