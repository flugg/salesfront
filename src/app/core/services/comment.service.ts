import { Injectable } from '@angular/core';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class CommentService {
  constructor(private api: RestApiService) {}

  post(postId: string, body: string) {
    return this.api.post(`posts/${postId}/comments`, { body }).then(response => response.data);
  }
}