import { Contract } from './contract.model';
import { Member } from './member.model';
import { Project } from './project.model';
import { Team } from './team.model';
import { User } from './user.model';
import { TeamMember } from './team-member.model';
import { Product } from './product.model';

export interface Sale {
  id: string;
  soldAt: string;
  registeredAt: string;
  value: number;
  memberId: string;
  teamMemberId: string;
  teamId: string;
  projectId: string;
  registererId: string;
  productId?: string;
  contract?: Contract;
  member?: Member;
  teamMember?: TeamMember;
  team?: Team;
  project?: Project;
  registerer?: User;
  product?: Product;
}
