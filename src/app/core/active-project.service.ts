import { Injectable } from '@angular/core';

@Injectable()
export class ActiveProjectService {

  /**
   * Retrieves a active project from storage.
   */
  get(): string | null {
    return localStorage.getItem('project');
  }

  /**
   * Sets the given active project in storage.
   */
  set(token: string): void {
    localStorage.setItem('project', token);
  }

  /**
   * Unsets the given active project from storage.
   */
  unset(): void {
    localStorage.removeItem('project');
  }
}
