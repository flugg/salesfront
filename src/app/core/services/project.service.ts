import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models/project.model';
import { PaginationResponse } from '../pagination-response';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class ProjectService {
  constructor(private api: RestApiService) {}

  listAll(organizationId: string): Observable<Project[]> {
    return this.api.get(`organizations/${organizationId}/projects`);
  }

  list(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/projects`, cursor, limit);
  }

  find(id: string): Observable<Project> {
    return this.api.get(`projects/${id}`, { include: 'contractTemplate.fields' }).map(response => response.data);
  }

  create(organizationId: string, attributes: any): Promise<Project> {
    return this.api.post(`organizations/${organizationId}/projects`, attributes).then(response => response.data);
  }

  update(projectId: string, attributes: any) {
    return this.api.put(`projects/${projectId}`, attributes).then(response => response.data);;
  }
}
