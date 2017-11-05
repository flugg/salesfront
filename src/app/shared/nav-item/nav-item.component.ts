import { Component, Input } from '@angular/core';

import { popInOut } from '../../core/animations/pop-in-out';
import { Organization } from '../../core/models/organization.model';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'vmo-nav-item',
  templateUrl: 'nav-item.component.html',
  styleUrls: ['nav-item.component.scss'],
  animations: [popInOut()]
})
export class NavItemComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() link?: string;
  @Input() organization?: Organization;
  @Input() project?: Project;
  @Input() notifications? = 0;
}