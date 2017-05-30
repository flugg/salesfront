import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { PostService } from '../shared/post.service';
import { CommentService } from '../shared/comment.service';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { ActiveUserService } from '../../../../active-user.service';
import { PostListService } from './post-list.service';
import { Project } from '../../../../shared/project.model';
import { Post } from '../shared/post.model';
import { User } from '../../../../shared/user.model';

@Component({
  providers: [PostListService],
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The active project.
   */
  project: Project;

  /**
   * The active user.
   */
  user: User;

  /**
   * List of loaded posts.
   */
  posts: Post[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public postList: PostListService,
              private activeProject: ActiveProjectService,
              private activeUser: ActiveUserService,
              private postService: PostService,
              private commentService: CommentService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeProject.project,
      this.activeUser.user,
      this.postList.posts
    ).subscribe(data => {
      [this.project, this.user, this.posts] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Submits the form to publish a post.
   */
  publishPost(body: string) {
    if (body) {
      this.postService.publish(this.project.id, body);
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
