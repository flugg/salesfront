import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { Organization } from '../models/organization.model';

@Injectable()
export class OrganizationService {
  constructor(private api: RestApiService) {}

  list(): Observable<Organization[]> {
    return this.api.get('organizations').map(response => response.data);
  }

  find(id: string): Observable<Organization> {
    return this.api.get(`organizations/${id}`, { include: 'projects,membership.teamMembers' }).map(response => response.data);
  }
}
