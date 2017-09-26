import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Project } from '../../core/models/project.model';

@Component({
  selector: 'vmo-project-icon',
  templateUrl: 'project-icon.component.html',
  styleUrls: ['project-icon.component.scss']
})
export class ProjectIconComponent implements OnInit, OnChanges {
  @Input() project: Project;

  abbreviation: string;

  ngOnInit(): void {
    // this.abbreviation = this.getAbbreviation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.abbreviation = this.getAbbreviation();
  }

  private getAbbreviation(): string {
    return this.project.name.match(/(?:^|\s)\w/g).map(item => item.trim()).join('').slice(0, 3);
  }
}
