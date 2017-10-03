import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { popInOut } from '../../../../core/animations/pop-in-out';
import { Member } from '../../../../core/models/member.model';
import { Post } from '../../../../core/models/post.model';
import { Project } from '../../../../core/models/project.model';
import { CommentService } from '../../../../core/services/comment.service';
import { PostService } from '../../../../core/services/post.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { ActiveProjectService } from '../../../active-project.service';
import { PostListService } from './post-list.service';

@Component({
  providers: [PostListService],
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.scss'],
  animations: [popInOut()]
})
export class PostListComponent implements OnInit, OnDestroy {
  loading = true;
  showTextArea = false;
  member: Member;
  project: Project;
  posts: Post[];

  private subscriptions: Subscription[] = [];

  constructor(public postListService: PostListService,
              private activeMembershipService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService,
              private postService: PostService,
              private commentService: CommentService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.activeProjectService.project,
      this.postListService.posts
    ).subscribe(data => {
      [this.member, this.project, this.posts] = data;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  publishPost(body: string) {
    if (body) {
      this.postService.publish(this.project.id, body).then(() => this.showTextArea = false);
    }
  }

  postComment(post: Post, body: string) {
    if (body) {
      this.commentService.post(post.id, body);
    }
  }

  displayTextArea(input) {
    this.showTextArea = true;
    setTimeout(() => input.focus(), 10);
  }

  hideTextArea(input) {
    if (!input.value) {
      this.showTextArea = false;
    }
  }
}
