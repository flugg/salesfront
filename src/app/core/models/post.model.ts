import { User } from './user.model';
import { Comment } from './comment.model';

export interface Post {
  id: string,
  body: string;
  publishedAt: string;
  userId: string;
  user?: User;
  comments?: Comment[];
}
