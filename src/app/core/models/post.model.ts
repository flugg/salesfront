import { Comment } from './comment.model';
import { Member } from './member.model';
import { Project } from './project.model';

export interface Post {
  id: string,
  body: string;
  publishedAt: string;
  projectId: string;
  memberId: string;
  project?: Project;
  member?: Member;
  comments?: Comment[];
}
