import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  /**
   * Emits an event when the sidebar should be opened.
   */
  isOpened = new EventEmitter();

  /**
   * Constructs the service.
   */
  constructor() {}

  /**
   * Opens the sidebar.
   */
  open() {
    this.isOpened.emit(true);
  }

  /**
   * Closes the sidebar.
   */
  close() {
    this.isOpened.emit(false);
  }
}
