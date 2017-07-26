import { Comment } from './comment.model';
import { Membership } from '../../../../shared/membership.model';

export interface Post {
  id: string,
  body: string;
  publishedAt: string;
  userId: string;
  comments?: Comment[];
  membership?: Membership;
}
