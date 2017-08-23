import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  constructor(private api: RestApiService) {}

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/posts`, cursor, limit);
  }

  find(id: string): Observable<Post> {
    return this.api.get(`posts/${id}`).map(response => response.data);
  }

  publish(projectId: string, body: string) {
    return this.api.post(`projects/${projectId}/posts`, { body }).then(response => response.data);
  }
}
