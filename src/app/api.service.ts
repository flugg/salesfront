import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ApiService {

  /**
   * Construct the service.
   */
  constructor(private http: Http) { }

  postData(dataLoad: any, sub_uri:string) {
    const body = JSON.stringify(dataLoad);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(sub_uri, body, {headers: headers});
  }

  getData(container: any, sub_uri:string) {
    return this.http.get(sub_uri)
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          container = data;
          //does it work without emitting event?
        }
      );
  }
}
