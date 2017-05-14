import { Component, Input } from '@angular/core';
import { ObservableResourceList } from '../../core/sockets/observable-resource-list';

@Component({
  selector: 'vmo-load-more-button',
  templateUrl: 'load-more-button.component.html',
  styleUrls: ['load-more-button.component.scss']
})
export class LoadMoreButtonComponent {

  /**
   * The observable pagination list.
   */
  @Input() paginator: ObservableResourceList;
}
