import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActiveProjectService } from '../active-project.service';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class ProjectComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit() {
  }
}
