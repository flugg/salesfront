import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'vmo-project-list',
  templateUrl: 'project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The cursor for the paginated projects.
   */
  cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor() {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.isLoading = false;
  }
}
