import { Member } from './member.model';
import { Project } from './project.model';
import { User } from './user.model';
import { Team } from './team.model';

export interface Sale {
  id: string;
  soldAt: string;
  registeredAt: string;
  value: number;
  memberId: string;
  teamId: string;
  projectId: string;
  registererId: string;
  member?: Member;
  team?: Team;
  project?: Project;
  registerer?: User;
}
