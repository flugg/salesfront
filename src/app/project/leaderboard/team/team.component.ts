import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SaleService } from '../../sales/sale.service';
import { ActiveProjectService } from '../../../core/active-project.service';
import { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'vmo-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * List of teams sale stats
   */
  teams: Sale[];

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
    this.subscriptions.push(this.saleService.getFromTeamWithUpdates(this.activeProject.snapshot(), this.cursor).subscribe(teams => {
      this.teams = teams;
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
