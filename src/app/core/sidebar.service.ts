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
    console.log('open');
    this.isOpened.emit(true);
  }

  /**
   * Closes the sidebar navigation.
   */
  close() {
    console.log('close');
    this.isOpened.emit(false);
  }
}
