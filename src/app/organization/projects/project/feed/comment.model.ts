import { Post } from './post.model';
import { User } from '../../../../core/user.model';

export interface Comment {
  id: string,
  body: string;
  postedAt: string;
  postId: string;
  userId: string;
  post?: Post;
  user?: User;
}
