import { Component } from '@angular/core';
import { ScreenService } from './core/screen.service';

@Component({
  selector: 'vmo-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  /**
   * Constructs the component.
   */
  constructor(private screen: ScreenService) {}
}
