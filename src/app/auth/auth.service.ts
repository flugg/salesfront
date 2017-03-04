import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";


@Injectable()
export class AuthService {
  public token;
  private refreshToken;

  /**
   * Construct the service.
   */
  constructor(private http: Http) {
    if(!localStorage.getItem('id_token'))
      this.grantToken({
        email: 'test@test.com',
        password: 'test'
      });
  }

  grantToken(userCredentials?){
    this.token = this.requestToken(userCredentials)
      .map(r => r.token)
      .subscribe(t => localStorage.setItem('id_token', t));
  }

  private requestToken(query: any){
    return this.http.post('http://api.vendumo.com/tokens', query)
      .map(res => res.json())
  }

  /**
   * Check if the user is logged in.
   */
  isAuthenticated(): Observable<boolean> {
    return Observable.of(true);
  }
}
