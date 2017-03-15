import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

  /**
   * Construct the service.
   */
  constructor(private http: Http, private router: Router) {}

  login(email, psw){
    let token = localStorage.getItem('id_token');
    if(!token) {
      this.grantToken({
        email: email,
        password: psw
      });
      console.log(token);
    }

    this.isAuthenticated().subscribe( res => {
      console.log(res);
      if(tokenNotExpired() || res)
        this.navigateToLanding();
    });
  }

  grantToken(userCredentials?){
    this.requestToken(userCredentials)
        //.map(r => r.token)
        .subscribe(t => {
          localStorage.setItem('id_token', t.token);
          localStorage.setItem('current_user', t.data.id);
        });
  }

  private requestToken(query: any){
    return this.http.post('http://api.vendumo.com/tokens', query)
      .map(res => res.json());
  }

  /**
   * Check if the user is logged in.
   */
  isAuthenticated(): Observable<boolean> {
    return Observable.of(tokenNotExpired());
  }

  navigateToLanding(){
    let projectUrl = '/projects';
    let currentProject = localStorage.getItem('current_project');
    if(currentProject) projectUrl += '/' + currentProject;
    this.router.navigateByUrl(projectUrl);
  }
}
