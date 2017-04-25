import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActiveProjectService {

  activeProject: BehaviorSubject<string>;

  constructor() {
    this.activeProject = new BehaviorSubject(null);
  }

  /**
   * Retrieves a active project from storage.
   */
  get(): Observable<string> {
    return this.activeProject.asObservable();
  }

  /**
   * Sets the given active project in storage.
   */
  set(token: string): void {
    localStorage.setItem('project', token);
    this.activeProject.next(token);

  }

  /**
   * Unsets the given active project from storage.
   */
  unset(): void {
    localStorage.removeItem('project');
  }

  /**
   * Check for a stored project in localstorage and
   */
  snapshot() {
    return this.activeProject.getValue();
  }
}
