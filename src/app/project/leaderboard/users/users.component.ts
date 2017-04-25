import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SaleService } from '../../sales/sale.service';
import { ActiveProjectService } from '../../../core/active-project.service';
import { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'vmo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Users sales in project
   */
  users: Sale[];

  /**
   * The cursor for the paginated memberships.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor(private saleService: SaleService,
              private activeProject: ActiveProjectService) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.saleService.getFromUsersWithUpdates(this.activeProject.snapshot(), this.cursor).subscribe(users => {
      this.users = users;
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
