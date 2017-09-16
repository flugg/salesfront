import { Contract } from './contract.model';
import { Member } from './member.model';
import { Project } from './project.model';
import { Team } from './team.model';
import { User } from './user.model';

export interface Sale {
  id: string;
  soldAt: string;
  registeredAt: string;
  value: number;
  memberId: string;
  teamId: string;
  projectId: string;
  registererId: string;
  contract?: Contract;
  member?: Member;
  team?: Team;
  project?: Project;
  registerer?: User;
}
