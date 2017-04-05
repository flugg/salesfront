import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './core/auth/auth.service';
import { User } from './core/models/user.model';
import { SidebarService } from './core/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sf-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  /**
   * The currently logged in user.
   */
  currentUser: Observable<User>;

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') sidenav: MdSidenav;

  /**
   * Constructs the component.
   */
  constructor(private sidebar: SidebarService,
              private auth: AuthService,
              private router: Router) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.sidebar.isOpened.subscribe(open => open ? this.sidenav.open() : this.sidenav.close());
  }

  /**
   * Navigates to the given route.
   */
  navigateTo(paths: any[]) {
    this.router.navigate(paths).then(() => this.sidenav.close());
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
