import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { AuthService } from '../core/auth/auth.service';
import { SidebarService } from '../core/sidebar/sidebar.service';
import { ActiveProjectService } from '../core/active-project.service';
import { ActiveUserService } from '../core/auth/active-user.service';
import { Project } from '../core/project.model';
import { User } from '../core/user.model';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SaleService } from './shared/sale.service';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy {

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
   * The navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'forum' },
    { name: 'Leaderboard', route: 'leaderboard', icon: 'star' },
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Users', route: 'users', icon: 'person' },
    { name: 'Settings', route: 'settings', icon: 'settings' }
    /* { name: 'Budgets', route: 'budgets', icon: 'track_changes' }, */
    /* { name: 'Products', route: 'products', icon: 'shopping_basket' }, */
  ];

  /**
   * The side navigation component.
   */
  @ViewChild('sidenav') private sidenav: MdSidenav;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private sidebar: SidebarService,
              private auth: AuthService,
              private saleService: SaleService,
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService,
              private dialog: MdDialog) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.activeProject.project
    ).subscribe(data => {
      [this.user, this.project] = data;
      this.loading = this.user == null || this.project == null;
    }));

    this.sidebar.setSidenav(this.sidenav);
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
    this.sidenav.close().then(() => {
      this.auth.logout();
      this.router.navigate(['login']);
    });
  }

  /**
   * Opens the dialog to add a sale.
   */
  registerSale() {
    this.saleService.register(this.project).then(sale => {
      console.log(sale);
      this.dialog.open(SalesConfirmationComponent);
    });
  }
}
