import { Component, Input } from '@angular/core';

import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'vmo-nav-item',
  templateUrl: 'nav-item.component.html',
  styleUrls: ['nav-item.component.scss']
})
export class NavItemComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() link: string;
  @Input() project: Project;
}