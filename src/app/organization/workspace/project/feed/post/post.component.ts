import { Component, EventEmitter, Input, Output } from '@angular/core';

import { fadeInOut } from '../../../../../core/animations/fade-in-out';
import { Post } from '../shared/post.model';
import { User } from '../../../../shared/user.model';

@Component({
  selector: 'vmo-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
  animations: [fadeInOut()]
})
export class PostComponent {

  /**
   * The given post to be displayed.
   */
  @Input() post: Post;

  /**
   * The logged in user.
   */
  @Input() user: User;

  /**
   * The event emitted when a comment is posted.
   */
  @Output() commentPosted = new EventEmitter<any>();

  /**
   * Handles submit events on the form.
   */
  onSubmit(comment: string) {
    this.commentPosted.emit(comment);
  }
}