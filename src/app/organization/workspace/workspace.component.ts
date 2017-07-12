import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdSidenav, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { fadeInOut } from '../../core/animations/fade-in-out';
import { slideUpDown } from '../../core/animations/slide-up-down';
import { ActiveProjectService } from './shared/active-project.service';
import { ActiveSidebarService } from './active-sidebar.service';
import { ActiveMembershipService } from './active-membership.service';
import { AuthService } from '../../core/auth/auth.service';
import { ScreenService } from '../../core/screen.service';
import { ActiveUserService } from '../active-user.service';
import { SalesTodayListService } from './shared/sales-today-list.service';
import { SaleService } from './shared/sale.service';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';
import { Membership } from '../shared/membership.model';
import { Sale } from './shared/sale.model';
import { ClockInConfirmationComponent } from './clock-in-confirmation/clock-in-confirmation.component';
import { SessionService } from '../shared/session.service';

@Component({
  providers: [
    ActiveSidebarService,
    ActiveMembershipService,
    SalesTodayListService
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
   * Indicates if the salesbar has a pending sales request.
   */
  pending = false;

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
   * The active membership.
   */
  membership: Membership;

  /**
   * The sales added today.
   */
  sales: Sale[];

  /**
   * List of navigation links.
   */
  links = [
    { name: 'Feed', route: 'feed', icon: 'forum' },
    { name: 'Leaderboard', route: 'leaderboard', icon: 'sort' },
    { name: 'Wall of Fame', route: 'wall-of-fame', icon: 'star' },
    { name: 'Sales', route: 'sales', icon: 'attach_money' },
    { name: 'Teams', route: 'teams', icon: 'group' },
    { name: 'Users', route: 'users', icon: 'person' }
    /*{ name: 'Settings', route: 'settings', icon: 'settings' }*/
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
              private snackbar: MdSnackBar,
              private auth: AuthService,
              private screen: ScreenService,
              private saleService: SaleService,
              private sidebar: ActiveSidebarService,
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService,
              private activeMembership: ActiveMembershipService,
              private salesToday: SalesTodayListService,
              private sessionService: SessionService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions = [
      Observable.combineLatest(
        this.activeUser.user,
        this.activeProject.project,
        this.activeMembership.membership,
        this.salesToday.sales
      ).subscribe(data => {
        [this.user, this.project, this.membership, this.sales] = data;

        this.loading = false;
      }),

      this.screen.asObservable().subscribe(breakpoint => {
        const mode = this.resolveMode(breakpoint);
        this.mode = mode;
        if (this.mode === 'over') {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
        this.sidebar.setSidenav(this.sidenav);
      }),

      this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
        if (this.mode === 'over') {
          this.sidenav.close();
        }
      })
    ];
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
    this.pending = true;
    this.saleService.register(this.membership.teamMembers[0].id).then(sale => {
      this.dialog.open(SalesConfirmationComponent, <MdDialogConfig>{
        panelClass: 'sales-dialog',
        data: {
          sale: sale,
          count: this.sales.length,
          membership: this.membership
        }
      });
      this.pending = false;
    });
  }

  /**
   * Clocks into work and starts a new sales session.
   */
  clockIn() {
    this.dialog.open(ClockInConfirmationComponent, <MdDialogConfig>{
      width: '400px',
      data: {
        teamMembers: this.membership.teamMembers
      }
    });
  }

  /**
   * Clocks out from work by stopping the active session.
   */
  clockOut() {
    this.sessionService.clockOut(this.membership.activeSession).then(() => {
      this.snackbar.open('Clocked out', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }

  /**
   * Resolves the sidebar mode from a breakpoint alias.
   */
  private resolveMode(breakpoint: string) {
    return breakpoint === 'xs' || breakpoint === 'sm' ? 'over' : 'side';
  }
}
