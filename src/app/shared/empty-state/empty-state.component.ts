import { Component, Input } from '@angular/core';

import { popInOut } from '../../core/animations/pop-in-out';

@Component({
  selector: 'vmo-empty-state',
  templateUrl: 'empty-state.component.html',
  styleUrls: ['empty-state.component.scss'],
  animations: [popInOut()]
})
export class EmptyStateComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() when: boolean;
  @Input() big = false;
}
