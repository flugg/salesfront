import { Comment } from './comment.model';
import { User } from '../../../../core/user.model';

export interface Post {
  id: string,
  body: string;
  publishedAt: string;
  userId: string;
  comments?: Comment[];
  user?: User;
}
