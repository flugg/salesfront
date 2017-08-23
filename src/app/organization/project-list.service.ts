import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../core/models/project.model';
import { ObservableResourceList } from '../core/observable-resource-list';
import { ProjectService } from '../core/services/project.service';
import { SocketApiService } from '../core/socket-api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ProjectListService extends ObservableResourceList implements OnDestroy {
  readonly projects: Observable<Project[]> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private projectService: ProjectService) {
    super();

      this.paginator.subscribe(limit => {
        this.pagination(this.projectService.list(this.route.snapshot.params['organization'], limit, this.cursor))
          .subscribe(projects => this.add(projects));
      });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}