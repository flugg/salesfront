import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'vmo-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['load-more-button.component.scss']
})
export class LoadMoreButtonComponent {

  /**
   * The press event emitted on click.
   */
  @Input() cursor: BehaviorSubject<number>;

  /**
   * The press event emitted on click.
   */
  @Input() amount: number;

  /**
   * The press event emitted on click.
   */
  @Output() press = new EventEmitter<any>();

  /**
   * Handles click events on the button.
   */
  onClick() {
    this.press.emit();
  }

  /**
   * Load more items.
   */
  loadMore() {
    this.cursor.next(this.amount);
  }

  /**
   * Check if all items has been loaded.
   */
  hasLoadedAll() {
    return this.cursor.isStopped;
  }
}
