import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { fadeInOut } from '../../core/animations/fade-in-out';
import { slideUpDown } from '../../core/animations/slide-up-down';
import { ActiveProjectService } from './shared/active-project.service';
import { ActiveSidebarService } from './active-sidebar.service';
import { AuthService } from '../../core/auth/auth.service';
import { ScreenService } from '../../core/screen.service';
import { ActiveUserService } from '../active-user.service';
import { SaleService } from './shared/sale.service';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';

@Component({
  providers: [
    ActiveSidebarService
  ],
  templateUrl: 'workspace.component.html',
  styleUrls: ['workspace.component.scss'],
  animations: [
    fadeInOut(),
    slideUpDown()
  ]
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The mode of the side navigation.
   */
  mode: string;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The active project.
   */
  project: Project;

  /**
   * List of navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'forum' },
    { name: 'Leaderboard', route: 'leaderboard', icon: 'star' },
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Users', route: 'users', icon: 'person' },
    { name: 'Settings', route: 'settings', icon: 'settings' }
  ];

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') private sidenav: MdSidenav;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private dialog: MdDialog,
              private auth: AuthService,
              private screen: ScreenService,
              private saleService: SaleService,
              private sidebar: ActiveSidebarService,
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.activeProject.project
    ).subscribe(data => {
      [this.user, this.project] = data;
      this.loading = false;
    }));

    this.subscriptions.push(this.screen.asObservable().subscribe(breakpoint => {
      const mode = this.resolveMode(breakpoint);
      this.mode = mode;
      if (this.mode === 'over') {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
      this.sidebar.setSidenav(this.sidenav);
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Logs the user out of the application and redirects to login screen.
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  /**
   * Adds a sale and opens the sales confirmation dialog.
   */
  addSale() {
    this.saleService.register(this.project).then(sale => this.dialog.open(SalesConfirmationComponent));
  }

  /**
   * Resolves the sidebar mode from a breakpoint alias.
   */
  private resolveMode(breakpoint: string) {
    return breakpoint === 'xs' || breakpoint === 'sm' ? 'over' : 'side';
  }
}
