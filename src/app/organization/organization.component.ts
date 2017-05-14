import { Component } from '@angular/core';

import { ActiveUserService } from './active-user.service';

@Component({
  providers: [ActiveUserService],
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent {
  //
}
