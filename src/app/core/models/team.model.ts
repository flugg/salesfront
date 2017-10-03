import { Project } from './project.model';
import { Sale } from './sale.model';
import { TeamMember } from './team-member.model';
import { User } from './user.model';

export interface Team {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  value?: number;
  currentValue?: number;
  position?: number;
  memberCount?: number;
  deletedAt?: string;
  project?: Project;
  sales?: Sale[];
  members?: TeamMember[];
  users?: User[];
}
