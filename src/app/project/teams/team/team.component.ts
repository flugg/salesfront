import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../../core/models/team.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vmo-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

  /**
   * Weather or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The team being shown
   */
  team: Team;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.teamService.findWithUpdates(this.route.snapshot.url[0].path).subscribe(team => {
      this.team = team;
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
