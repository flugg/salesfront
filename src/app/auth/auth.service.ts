import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  public token;

  /**
   * Construct the service.
   */
  constructor(private http: Http, private router: Router) {}

  grantToken(userCredentials?){
    this.token = this.requestToken(userCredentials)
      .map(r => r.token)
      .subscribe(t => {
        localStorage.setItem('id_token', t);
      });
  }

  login(email, psw){
    if(!localStorage.getItem('id_token'))
      this.grantToken({
        email: email,
        password: psw
      });
    if(this.isAuthenticated()){
      let projectUrl = '/projects';
      let currentProject = localStorage.getItem('current_project');
      if(currentProject) projectUrl += '/' + currentProject;
      this.router.navigateByUrl(projectUrl);
    }
  }

  private requestToken(query: any){
    return this.http.post('http://api.vendumo.com/tokens', query)
      .map(res => res.json())
  }

  /**
   * Check if the user is logged in.
   */
  isAuthenticated(): Observable<boolean> {
    return Observable.of(tokenNotExpired());
  }
}
