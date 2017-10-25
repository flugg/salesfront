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
      if (this.shouldTrackPage(event)) {
        if (this.overwrite) {
          this.previous = null;
          this.overwrite = false;
        } else if (this.current) {
          this.previous = this.current;
        }

        this.current = event;
      }
    });
  }

  private shouldTrackPage(event): boolean {
    if (!this.current) {
      return true;
    }

    if (event.urlAfterRedirects.split('/').length <= 5) {
      return true;
    }

    return this.stripLastSegment(event.urlAfterRedirects) !== this.stripLastSegment(this.current.urlAfterRedirects);
  }

  private stripLastSegment(url: string): string {
    const segments = url.split('/');
    segments.pop();

    return segments.join('/');
  }
}
