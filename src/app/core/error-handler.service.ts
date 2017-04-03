import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  /**
   * Constructs the service.
   */
  constructor(private injector: Injector) {}

  /**
   * Handles uncaught errors.
   */
  handleError(error) {
    const snackBar = this.injector.get(MdSnackBar).open('Something went wrong.', 'Reload');
    snackBar.onAction().subscribe(() => window.location.reload());
  }
}
