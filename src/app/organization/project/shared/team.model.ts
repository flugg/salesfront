import { Project } from '../../project.model';
import { User } from '../../../core/user.model';

export interface Team {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  project?: Project;
  users?: User[];
}
