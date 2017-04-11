import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RestApiService } from './rest-api.service';
import { ResourceListSubject } from './utils/subjects/resource-list-subject';

@Injectable()
export class Paginator {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {
  }

  /**
   * Fetch paginated data.
   */
  paginate(path: string, cursor: BehaviorSubject<number>, parameters?: any): ResourceListSubject<any[]> {
    const resources = new ResourceListSubject([]);

    cursor.subscribe(limit => {
      this.api.paginate(path, resources.nextCursor(), limit, parameters).subscribe(response => {
        resources.setCursor(response.cursor);
        resources.appendMany(response.data);

        if (!resources.nextCursor()) {
          cursor.complete();
        }
      });
    });

    return resources;
  }
}
