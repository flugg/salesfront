import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { Post } from './post.model';
import { PostListService } from './post-list.service';

@Component({
  providers: [PostListService],
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
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private route: ActivatedRoute,
              private postList: PostListService,
              private postService: PostService,
              private commentService: CommentService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.postList.posts.subscribe(posts => {
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
