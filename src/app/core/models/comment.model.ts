import { User } from './user.model';
import { Post } from './post.model';

export interface Comment {
  id: string,
  body: string;
  postedAt: string;
  userId: string;
  user?: User;
  postId: string;
  post?: Post;
}
