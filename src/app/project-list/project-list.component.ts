import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sf-project-list',
  templateUrl: 'project-list.component.html',
})
export class ProjectListComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The cursor for the paginated projects.
   */
  private cursor = new BehaviorSubject(15);

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.isLoading = false;
  }

  /**
   * Load more projects.
   */
  loadMore() {
    this.cursor.next(15);
  }

  /**
   * Check if all projects have been loaded.
   */
  hasLoadedAll() {
    return this.cursor.isStopped;
  }
}
