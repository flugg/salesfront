import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Injectable()
export class UrlService {
  current: any;
  previous: any;
  overwrite = false;

  constructor(private router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      if (this.overwrite) {
        this.previous = null;
        this.overwrite = false;
      } else if (this.current) {
        this.previous = this.current;
      }

      this.current = event;
    });
  }
}
