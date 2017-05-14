import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { fadeInOut } from '../../core/animations/fade-in-out';

@Component({
  selector: 'vmo-progress-spinner',
  templateUrl: 'progress-spinner.component.html',
  styleUrls: ['progress-spinner.component.scss'],
  animations: [fadeInOut()]
})
export class ProgressSpinnerComponent implements OnInit {

  /**
   * Indicates if the progress spinner should be visible.
   */
  visible = false;

  /**
   * The loading indicator.
   */
  @Input() hasLoaded: boolean | undefined;

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    Observable.timer(200).subscribe(() => this.visible = true);
  }
}
