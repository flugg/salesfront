import { Post } from './post.model';
import { User } from '../../../../shared/user.model';

export interface Comment {
  id: string,
  body: string;
  postedAt: string;
  postId: string;
  userId: string;
  post?: Post;
  user?: User;
}
