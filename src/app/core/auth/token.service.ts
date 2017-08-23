import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../../environments/environment';
import { StorageService } from '../storage.service';

@Injectable()
export class TokenService {
  constructor(private http: Http,
              private storage: StorageService) {}

  isValid(): boolean {
    const token = this.get();

    return token != null && tokenNotExpired('token', token);
  }

  get(): string | null {
    return this.storage.get('token');
  }

  set(token: string): void {
    this.storage.set('token', token);
  }

  unset(): void {
    this.storage.remove('token');
  }

  grant(email: string, password: string): Observable<string> {
    return this.http.post(environment.apiUrl + '/tokens', { email, password })
      .map(response => response.json().token);
  }
}
