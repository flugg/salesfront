import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class ReportService {
  constructor(private api: RestApiService) {}

  download(after: Moment, before: Moment): Observable<Blob> {
    return this.api.blob(`reports`, { after, before });
  }
}