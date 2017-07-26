import { Post } from './post.model';
import { Membership } from '../../../../shared/membership.model';

export interface Comment {
  id: string,
  body: string;
  postedAt: string;
  postId: string;
  userId: string;
  post?: Post;
  membership?: Membership;
}
