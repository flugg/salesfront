import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'vmo-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  /**
   * The cursor for the paginated projects.
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