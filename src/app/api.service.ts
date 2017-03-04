import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { AuthService } from "./auth/auth.service";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ApiService {

  private prototypePath: string = 'http://fi3nbv9q5aclaq95k-mock.stoplight-proxy.io/';
  private apiPath = 'http://api.vendumo.com/';
  private options;
  /**
   * Construct the service.
   */
  constructor(private http: Http,
              private auth: AuthService) {
    this.options = new RequestOptions(
      {
        headers: new Headers
        ({
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        })
      });
  }

  get(subUri:string) {
    return this.http.get(this.apiPath + subUri, this.options)
      .map(response => response.json().data)
      .catch(this.handleError)
  }

  put(data: any, subUri: string){
    return this.http.put(this.apiPath + subUri, data, this.options)
      .toPromise()
      .then(() => data)
      .catch(this.handleError)
  }

  create(data: any, subUri: string){
    return this.http.post(this.apiPath + subUri, data, this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  delete(subUri: string){
    return this.http.delete(this.apiPath + subUri, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

/*
 create(data: any, subUri: string){
 let options = this.getOptions();
 return this.http.post(this.apiPath + subUri, data, options)
 .toPromise()
 .then(res => res.json())
 .catch(this.handleError)
 }*/
