import { Component, Input } from '@angular/core';

@Component({
  selector: 'vmo-progress-spinner',
  templateUrl: 'progress-spinner.component.html',
  styleUrls: ['progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {

  /**
   * The loading indicator.
   */
  @Input() hasLoaded: boolean;

  /**
   * Constructs the component.
   */
  constructor() {}
}
