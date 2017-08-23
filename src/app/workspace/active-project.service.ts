import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { ObservableResource } from '../core/observable-resource';
import { SocketApiService } from '../core/socket-api.service';
import { ProjectService } from '../core/services/project.service';
import { Project } from '../core/models/project.model';
import { StorageService } from '../core/storage.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActiveProjectService extends ObservableResource implements OnDestroy {
  readonly project: Observable<Project> = this.subject.asObservable();
  private projectId = new Subject<string>();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private storage: StorageService,
              private projectService: ProjectService) {
    super();

    this.projectId.distinctUntilChanged().subscribe(id => {
      this.projectService.find(id).subscribe(project => this.set(project));
    });

    const projectId = this.resolveProjectId();
    if (projectId) {
      this.projectId.next(projectId);
    }
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    this.projectId.unsubscribe();
    super.ngOnDestroy();
  }

  getFromStorage(): string | null {
    return this.storage.get('project');
  }

  setInStorage(id: string): void {
    this.storage.set('project', id);
    this.projectId.next(id);
  }

  unsetFromStorage(): void {
    this.storage.remove('project');
  }

  private resolveProjectId() {
    if (this.route.snapshot.params['project']) {
      return this.route.snapshot.params['project'];
    }

    return this.getFromStorage();
  }
}