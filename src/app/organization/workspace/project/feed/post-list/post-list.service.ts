import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';

@Injectable()
export class PostListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of posts.
   */
  readonly posts: Observable<Post[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private postService: PostService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.postService.get(project.id, limit, this.cursor))
          .subscribe(posts => this.add(posts));
      });

      this.sockets.listenForProject(project.id, {
        'post_published': (post) => this.addPost(post),
        'comment_posted': (comment) => this.addComment(comment)
      }, this);
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Adds a new post to the list.
   */
  private addPost(post: any) {
    this.snapshot.unshift(post);
    this.updateFromSnapshot();
  }

  /**
   * Adds a related comment to the list.
   */
  private addComment(comment: any) {
    this.snapshot.find(post => post.id === comment.postId)['comments'].push(comment);
    this.updateFromSnapshot();
  }
}