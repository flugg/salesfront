import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  handleError(error) {
    if (! error.status) {
      const snackBar = this.injector.get(MdSnackBar).open('Something went wrong', 'Reload');
      snackBar.onAction().subscribe(() => window.location.reload());
    }

    if (environment.production) {
      window['Bugsnag'].notifyException(error);
    }

    super.handleError(error);
  }
}
