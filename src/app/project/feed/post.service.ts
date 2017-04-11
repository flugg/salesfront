import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { ResourceSubject } from '../../core/utils/subjects/resource-subject';
import { Post } from '../../core/models/post.model';

@Injectable()
export class PostService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {}

  /**
   * Fetch a list of posts.
   */
  get(cursor: BehaviorSubject<number>): Observable<Post[]> {
    const posts = this.paginator.paginate('posts', cursor);

    return posts.asObservable();
  }

  /**
   * Fetch an updating stream of the user's conversations.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): Observable<Post[]> {
    const posts = this.paginator.paginate('posts', cursor, { include: 'user' });

    this.onPublished(post => {
      posts.prepend(post);
    }).onCommentPosted(comment => {
      posts.addRelated(comment.postId, 'comments', comment);
    });

    return posts.asObservable();
  }

  /**
   * Fetch a conversation by id.
   */
  find(id: string): Observable<Post> {
    return this.api.get(`posts/${id}`).map(response => response.data);
  }

  /**
   * Fetch an updating stream of a single post by id.
   */
  findWithUpdates(id: string): Observable<Post> {
    const post = new ResourceSubject(null);

    this.find(id).subscribe(data => {
      post.next(data);
    });

    return post.asObservable();
  }

  /**
   * Publishes a new post.
   */
  publish(body: string) {
    return this.api.post('posts', { body }).then(response => response.data);
  }

  /**
   * Registers a listener for new posts.
   */
  onPublished(callback: Function): PostService {
    this.sockets.listenForProject('1', 'post_published', post => callback(post));
    return this;
  }

  /**
   * Registers a listener for new comments.
   */
  onCommentPosted(callback: Function): PostService {
    this.sockets.listenForProject('1', 'comment_posted', comment => callback(comment));
    return this;
  }
}