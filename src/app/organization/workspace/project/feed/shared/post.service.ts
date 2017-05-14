import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../../../core/http/pagination-response';
import { Post } from './post.model';

@Injectable()
export class PostService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of posts in a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/posts`, cursor, limit);
  }

  /**
   * Fetches a single post by id.
   */
  find(id: string): Observable<Post> {
    return this.api.get(`posts/${id}`).map(response => response.data);
  }

  /**
   * Publishes a new post.
   */
  publish(projectId: string, body: string) {
    return this.api.post(`projects/${projectId}/posts`, { body }).then(response => response.data);
  }
}
