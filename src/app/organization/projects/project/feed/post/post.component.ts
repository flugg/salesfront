import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'vmo-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  /**
   * The given post to be displayed.
   */
  @Input() post: Post;

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