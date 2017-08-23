import { Post } from './post.model';
import { Member } from './member.model';

export interface Comment {
  id: string,
  body: string;
  postedAt: string;
  postId: string;
  memberId: string;
  post?: Post;
  member?: Member;
}
