import { Injectable, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../../../core/models/post.model';
import { Session } from '../../../../core/models/session.model';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { PostService } from '../../../../core/services/post.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';

@Injectable()
export class PostListService extends ObservableResourceList implements OnDestroy {
  readonly posts: Observable<Post[]> = this.subject.asObservable();

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
        'comment_posted': (comment) => this.addComment(comment),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addPost(post: any) {
    this.snapshot.unshift(post);
    this.updateFromSnapshot();
  }

  private addComment(comment: any) {
    const post = this.snapshot.find(post => post.id === comment.postId);

    if (post) {
      post.comments.push(comment);
      this.updateFromSnapshot();
    }
  }

  private setActiveSession(session: Session) {
    this.snapshot.map(post => {
      if (post.memberId === session.memberId) {
        post.member.activeSession = session;
      }

      post.comments.map(comment => {
        if (comment.memberId === session.memberId) {
          comment.member.activeSession = session;
        }

        return comment;
      });

      return post;
    });

    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {
    this.snapshot.map(post => {
      if (post.memberId === session.memberId) {
        post.member.activeSession = null;
      }

      post.comments.map(comment => {
        if (comment.memberId === session.memberId) {
          comment.member.activeSession = null;
        }

        return comment;
      });

      return post;
    });

    this.updateFromSnapshot();
  }
}