import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { ActiveProjectService } from '../../../core/active-project.service';
import { MemberService } from '../member.service';
import { Membership } from '../../../core/models/membership.model';

@Component({
  selector: 'vmo-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded membersips.
   */
  memberships: Membership[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated memberships.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor(private memberService: MemberService,
              private activeProject: ActiveProjectService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.memberService.getWithUpdates(this.activeProject.get(), this.cursor).subscribe(memberships => {
      this.memberships = memberships;
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
