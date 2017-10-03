import { Component } from '@angular/core';
import { ScreenService } from './core/screen.service';
import { UrlService } from './core/url.service';

@Component({
  selector: 'vmo-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private screen: ScreenService, private url: UrlService) {}
}
