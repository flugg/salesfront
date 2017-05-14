import { Project } from '../../shared/project.model';
import { Team } from '../project/shared/team.model';
import { User } from '../../shared/user.model';

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
