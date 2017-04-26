import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  /**
   * Emits event when the sidebar should be opened.
   */
  isOpened = new EventEmitter();

  /**
   * Constructs the service.
   */
  constructor() {
  }

  /**
   * Opens the sidebar navigation.
   */
  open() {
    this.isOpened.emit(true);
  }

  /**
   * Closes the sidebar navigation.
   */
  close() {
    this.isOpened.emit(false);
  }
}
