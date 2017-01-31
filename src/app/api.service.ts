import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ApiService {

  private defaultPath: string = 'http://fi3nbv9q5aclaq95k-mock.stoplight-proxy.io/';
  /**
   * Construct the service.
   */
  constructor(private http: Http) { }

  postData(dataLoad: any, sub_uri:string) {
    const body = JSON.stringify(dataLoad);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.defaultPath + sub_uri, body, { headers: headers });
  }

  getData(container: any, sub_uri:string) {
    return this.http.get(this.defaultPath + sub_uri)
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          container = data;
          //does it work without emitting event?
          }
        );
  }

  get(subUri:string) {
    return this.http.get(this.defaultPath + subUri)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
