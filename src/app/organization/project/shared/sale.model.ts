import { Project } from '../../../core/project.model';
import { Team } from './team.model';
import { User } from '../../../core/user.model';

export interface Sale {
  id: string;
  projectId: string;
  teamId: string;
  userId: string;
  createdAt: string;
  project?: Project;
  team?: Team;
  user?: User;
}
