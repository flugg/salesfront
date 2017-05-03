import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { Post } from './post.model';
import { PostListService } from './post-list.service';
import { ActiveProjectService } from '../../../core/active-project.service';
import { Project } from '../../../core/project.model';

@Component({
  providers: [PostListService],
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.scss']
})
export class FeedComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The active project.
   */
  project: Project;

  /**
   * List of loaded posts.
   */
  posts: Post[];

  /**
   * Constructs the component.
   */
  constructor(public postList: PostListService,
              private activeProject: ActiveProjectService,
              private postService: PostService,
              private commentService: CommentService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    Observable.combineLatest(
      this.activeProject.project,
      this.postList.posts
    ).subscribe(data => {
      [this.project, this.posts] = data;
      this.loading = false;
    });
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
