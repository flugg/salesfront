import { Component, EventEmitter, Input, Output } from '@angular/core';

import { fadeInOut } from '../../../../core/animations/fade-in-out';
import { Member } from '../../../../core/models/member.model';
import { Post } from '../../../../core/models/post.model';

@Component({
  selector: 'vmo-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
  animations: [fadeInOut()]
})
export class PostComponent {
  @Input() post: Post;
  @Input() member: Member;
  @Output() commentPosted = new EventEmitter<any>();

  onSubmit(comment: string) {
    this.commentPosted.emit(comment);
  }
}