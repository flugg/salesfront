import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {
  constructor(private api: RestApiService) {}

  list(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/projects`, cursor, limit);
  }

  find(id: string): Observable<Project> {
    return this.api.get(`projects/${id}`).map(response => response.data);
  }

  create(organizationId: string): Promise<Project> {
    return this.api.post(`organizations/${organizationId}/projects`, {}).then(response => response.data);
  }
}
