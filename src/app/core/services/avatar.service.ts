import { Injectable } from '@angular/core';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class AvatarService {
  constructor(private api: RestApiService) {}

  upload(userId: string, image: string) {
    return this.api.post(`users/${userId}/avatars`, { image }).then(response => response.data);
  }
}
