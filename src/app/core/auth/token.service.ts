import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenService {

  /**
   * Constructs the service.
   */
  constructor(private http: Http) {}

  /**
   * Checks if the token exists and is not expired.
   */
  isValid(): boolean {
    return this.get() != null && tokenNotExpired('token');
  }

  /**
   * Retrieves a token from storage.
   */
  get(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Sets the given token in storage.
   */
  set(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Unsets the given token in storage.
   */
  unset(): void {
    localStorage.removeItem('token');
  }

  /**
   * Grants a token from the given credentials.
   */
  grant(email: string, password: string): Observable<string> {
    return this.http.post('http://api.vendumo.com/tokens', { email, password })
      .map(response => response.json().token);
  }
}
