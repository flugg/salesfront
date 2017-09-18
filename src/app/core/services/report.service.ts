import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class ReportService {
  constructor(private api: RestApiService) {}

  download(projectId: string, after: Moment, before: Moment, filetype: string): Observable<Blob> {
    return this.api.blob(`projects/${projectId}/reports`, {
      after: after.toISOString(),
      before: before.toISOString(),
      filetype: filetype
    });
  }
}