import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { TokenService } from '../auth/token.service';

@Injectable()
export class RestApiService {

  /**
   * The base path to the REST API.
   */
  private basePath = 'http://api.vendumo.com/';

  /**
   * Constructs the service.
   */
  constructor(private http: AuthHttp, private tokenService: TokenService) {}

  /**
   * Performs a GET request to the API.
   */
  get(path: string, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.get(this.basePath + path, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Performs a GET request to the API.
   */
  paginate(path: string, cursor: string, limit: number, parameters?: any) {
    const urlParameters = this.parseParameters(parameters);
    urlParameters.set('cursor', cursor);
    urlParameters.set('limit', limit.toString());

    const options = this.buildOptions().merge({
      search: urlParameters
    });

    return this.http.get(this.basePath + path, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Performs a POST request to the API.
   */
  post(path: string, body?: any, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.post(this.basePath + path, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Performs a PUT request to the API.
   */
  put(path: string, body?: any, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.put(this.basePath + path, body, options)
      .toPromise()
      .then(() => body)
      .catch(this.handleError);
  }

  /**
   * Performs a DELETE request to the API.
   */
  delete(path: string, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.delete(this.basePath + path, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Builds a request options object.
   */
  private buildOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + this.tokenService.get()
      })
    });
  }

  /**
   * Parses URL query string parameters from a raw object.
   */
  private parseParameters(parameters: any): URLSearchParams {
    const urlParameters = new URLSearchParams();
    for (const key in parameters) {
      urlParameters.set(key, parameters[key]);
    }

    return urlParameters;
  }

  /**
   * Handles request errors.
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
