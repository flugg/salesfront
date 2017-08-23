import { Component, Input } from '@angular/core';

import { Project } from '../../core/models/project.model';

@Component({
  selector: 'vmo-project-list',
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent {
  @Input() projects: Project[];
}
