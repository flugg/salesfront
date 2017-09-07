import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { TokenService } from './auth/token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RestApiService {
  constructor(private http: AuthHttp, private tokenService: TokenService) {}

  get(path: string, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.get(`${environment.apiUrl}/${path}`, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  paginate(path: string, cursor: string, limit: number, parameters?: any) {
    const urlParameters = this.parseParameters(parameters);
    urlParameters.set('cursor', cursor);
    urlParameters.set('limit', limit.toString());

    const options = this.buildOptions().merge({
      search: urlParameters
    });

    return this.http.get(`${environment.apiUrl}/${path}`, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  post(path: string, body?: any, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.post(`${environment.apiUrl}/${path}`, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  put(path: string, body?: any, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.put(`${environment.apiUrl}/${path}`, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(path: string, parameters?: any) {
    const options = this.buildOptions().merge({
      search: this.parseParameters(parameters)
    });

    return this.http.delete(`${environment.apiUrl}/${path}`, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private buildOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + this.tokenService.get()
      })
    });
  }

  private parseParameters(parameters: any): URLSearchParams {
    const urlParameters = new URLSearchParams();
    for (const key in parameters) {
      urlParameters.set(key, parameters[key]);
    }

    return urlParameters;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
