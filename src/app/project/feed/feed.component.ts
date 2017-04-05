import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from './post.service';
import { SidebarService } from '../../core/sidebar.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'sf-feed',
  templateUrl: 'feed.component.html',
})
export class FeedComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded posts.
   */
  posts: Observable<Post[]>;

  /**
   * The cursor for the paginated posts.
   */
  private cursor = new BehaviorSubject(15);

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private postService: PostService,
              public sidebar: SidebarService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.posts = this.postService.getWithUpdates(this.cursor);

    this.subscriptions.push(this.posts.subscribe(() => {
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
   * Load more conversations.
   */
  loadMore() {
    this.cursor.next(15);
  }

  /**
   * Check if all conversations has been loaded.
   */
  hasLoadedAll() {
    return this.cursor.isStopped;
  }

  /**
   * Submits the form to publish a post.
   */
  publishPost(body: string) {
    this.postService.publish(body).then(post => {

    });
  }
}
