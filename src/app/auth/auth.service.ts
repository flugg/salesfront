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

  login(email, psw){
    this.token = localStorage.getItem('id_token');
    if(!this.token)
      this.grantToken({
        email: email,
        password: psw
      });
    this.isAuthenticated().subscribe( res => {
      if(res){
        console.log('auth redir');
        let projectUrl = '/projects';
        let currentProject = localStorage.getItem('current_project');
        if(currentProject) projectUrl += '/' + currentProject;
        this.router.navigateByUrl(projectUrl);
      }
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
    return Observable.of(tokenNotExpired());
  }
}
