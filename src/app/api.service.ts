import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ApiService {

  private defaultPath: string = 'http://fi3nbv9q5aclaq95k-mock.stoplight-proxy.io/';
  /**
   * Construct the service.
   */
  constructor(private http: Http) { }

  get(subUri:string) {
    return this.http.get(this.defaultPath + subUri)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError)
  }

  put(subUri: string, data: any){
    return this.http.put(this.defaultPath + subUri, data)
      .toPromise()
      .then(() => data)
      .catch(this.handleError)
  }

  create(subUri: string, data: any){
    return this.http.post(this.defaultPath + subUri, data)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError)
  }

  delete(subUri: string){
    return this.http.delete(this.defaultPath + subUri)
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
