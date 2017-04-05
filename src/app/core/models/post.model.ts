import { User } from './user.model';

export interface Post {
  id: string,
  body: string;
  publishedAt: string;
  userId: string;
  user?: User;
}
