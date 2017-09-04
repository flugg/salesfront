import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../../core/models/project.model';

@Component({
  selector: 'vmo-project-icon',
  templateUrl: 'project-icon.component.html',
  styleUrls: ['project-icon.component.scss']
})
export class ProjectIconComponent implements OnInit {
  @Input() project: Project;

  abbreviation: string;

  ngOnInit(): void {
    this.abbreviation = this.getAbbreviation();
  }

  private getAbbreviation(): string {
    return this.project.name.match(/\b\w/g).join('').slice(0, 3);
  }
}
