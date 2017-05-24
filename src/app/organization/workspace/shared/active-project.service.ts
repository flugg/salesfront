import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { ObservableResource } from '../../../core/sockets/observable-resource';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { ProjectService } from '../../shared/project.service';
import { Project } from '../../shared/project.model';

@Injectable()
export class ActiveProjectService extends ObservableResource implements OnDestroy {

  /**
   * The observable active project.
   */
  readonly project: Observable<Project> = this.subject.asObservable();

  /**
   * The active project id subject.
   */
  private projectId = new BehaviorSubject(null);

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private projectService: ProjectService) {
    super();

    this.projectId.distinctUntilChanged().filter(id => id != null).subscribe(id => {
      this.projectService.find(id).subscribe(project => this.set(project));
    });

    this.projectId.next(this.resolveProjectId());
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    this.projectId.unsubscribe();
    super.ngOnDestroy();
  }

  /**
   * Retrieves a active project id from storage.
   */
  getFromStorage(): string | null {
    return localStorage.getItem('project');
  }

  /**
   * Sets the active project id in storage.
   */
  setInStorage(id: string): void {
    localStorage.setItem('project', id);
    this.projectId.next(id);
  }

  /**
   * Resolves a project id from url or storage.
   */
  private resolveProjectId() {
    if (this.route.snapshot.params.project) {
      return this.route.snapshot.params.project;
    }

    return this.getFromStorage();
  }
}