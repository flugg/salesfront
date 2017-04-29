import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveProjectService {

  /**
   * The observable active project.
   */
  project: BehaviorSubject<string>;

  /**
   * Consturcts the component.
   */
  constructor() {
    this.project = new BehaviorSubject(null);
  }

  /**
   * Retrieves a active project from storage.
   */
  get(): Observable<string> {
    return this.project.asObservable();
  }

  /**
   * Sets the given active project in storage.
   */
  set(token: string): void {
    localStorage.setItem('project', token);
    this.project.next(token);

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
    return this.project.getValue();
  }
}
