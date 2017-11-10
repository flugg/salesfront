import { Component } from '@angular/core';

import { fadeInOut } from './core/animations/fade-in-out';
import { ScreenService } from './core/screen.service';
import { UrlService } from './core/url.service';

@Component({
  selector: 'vmo-root',
  templateUrl: 'app.component.html',
  animations: [fadeInOut()]
})
export class AppComponent {
  constructor(private screen: ScreenService, private url: UrlService) {}
}
