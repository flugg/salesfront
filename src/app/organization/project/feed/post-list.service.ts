import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { PostService } from './post.service';
import { Post } from './post.model';

@Injectable()
export class PostListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of posts.
   */
  readonly posts: Observable<Post[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private postService: PostService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.postService.get(this.route.snapshot.params.id, limit, this.cursor))
        .subscribe(posts => this.add(posts));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}