import { Injectable } from '@angular/core';

import { RestApiService } from '../../../../core/http/rest-api.service';

@Injectable()
export class CommentService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Posts a new comment in the given post.
   */
  post(postId: string, body: string) {
    return this.api.post(`posts/${postId}/comments`, { body }).then(response => response.data);
  }
}