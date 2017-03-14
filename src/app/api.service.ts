import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ApiService {
  private apiPath = 'http://api.vendumo.com/';
  private options;
  /**
   * Construct the service.
   */
  constructor(private http: AuthHttp) {

    // TODO Test before depricating
    this.options = new RequestOptions(
      {
        headers: new Headers
        ({
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        })
      });
  }

  get(subUri:string) {
    return this.http.get(this.apiPath + subUri)
      .map(response => response.json().data)
      .catch(this.handleError)
  }

  put(data: any, subUri: string){
    return this.http.put(this.apiPath + subUri, data)
      .toPromise()
      .then(() => data)
      .catch(this.handleError)
  }

  create(data: any, subUri: string){
    return this.http.post(this.apiPath + subUri, data)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  delete(subUri: string){
    return this.http.delete(this.apiPath + subUri)
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
