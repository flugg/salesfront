import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../core/sockets/socket-api.service';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';

@Injectable()
export class ProjectListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of projects.
   */
  readonly projects: Observable<Project[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private projectService: ProjectService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.projectService.get(limit, this.cursor)).subscribe(projects => this.add(projects));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}