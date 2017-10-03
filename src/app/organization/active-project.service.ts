import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Project } from '../core/models/project.model';

import { ObservableResource } from '../core/observable-resource';
import { ProjectService } from '../core/services/project.service';
import { SocketApiService } from '../core/socket-api.service';
import { StorageService } from '../core/storage.service';

@Injectable()
export class ActiveProjectService extends ObservableResource implements OnDestroy {
  readonly project: Observable<Project | null> = this.subject.asObservable();
  private projectId = new Subject<string>();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private storage: StorageService,
              private projectService: ProjectService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.sockets.stopListening(this);

      this.projectId.distinctUntilChanged().subscribe(id => {
        if (id) {
          this.projectService.find(id).subscribe(project => {
            if (this.getFromStorage() === project.id) {
              this.set(project);
            }
          });
        } else {
          this.set(null);
        }
      });

      this.projectId.next(this.resolveProjectId());
    });
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
    this.projectId.next(null);
  }

  private resolveProjectId() {
    if (this.route.snapshot.params['project']) {
      return this.route.snapshot.params['project'];
    }

    return this.getFromStorage();
  }
}
