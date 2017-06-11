import { Injectable } from '@angular/core';

import { RestApiService } from '../../../../../core/http/rest-api.service';

@Injectable()
export class AvatarService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Uploads a user avatar.
   **/
  upload(userId: string, image: string) {
    return this.api.post(`users/${userId}/avatars`, { image }).then(response => response.data);
  }
}
