import { Component } from '@angular/core';

import { ActiveUserService } from './active-user.service';
import { MembershipListService } from './shared/membership-list.service';

@Component({
  providers: [
    ActiveUserService,
    MembershipListService
  ],
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent {
  //
}
