import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from './post.service';
import { Post } from '../../core/models/post.model';
import { CommentService } from './comment.service';

@Component({
  selector: 'vmo-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded posts.
   */
  posts: Post[];

  /**
   * The cursor for the paginated posts.
   */
  cursor = new BehaviorSubject(15);

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private postService: PostService,
              private commentService: CommentService,
              private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.postService.getWithUpdates(this.route.snapshot.parent.parent.params['id'], this.cursor).subscribe(posts => {
      this.posts = posts;
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   * Submits the form to publish a post.
   */
  publishPost(body: string) {
    if (body) {
      this.postService.publish(this.route.snapshot.parent.parent.params['id'], body);
    }
  }

  /**
   * Submits the form to post a comment.
   */
  postComment(post: Post, body: string) {
    if (body) {
      this.commentService.post(post.id, body);
    }
  }
}
