import { Component, OnInit } from '@angular/core';

import { MembershipListService } from '../shared/membership-list.service';
import { Membership } from '../shared/membership.model';

@Component({
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of memberships.
   **/
  memberships: Membership[];

  /**
   * Constructs the component.
   */
  constructor(public membershipList: MembershipListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.membershipList.memberships.subscribe(memberships => {
      this.memberships = memberships;
      this.loading = false;
    });
  }
}
