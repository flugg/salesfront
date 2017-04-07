import { Component, Input } from '@angular/core';

@Component({
  selector: 'vmo-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {

  /**
   * The loading indicator.
   */
  @Input() hasLoaded: boolean;

  /**
   * Constructs the component.
   */
  constructor() {}
}
