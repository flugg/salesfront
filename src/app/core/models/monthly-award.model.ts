import { Project } from './project.model';
import { Member } from './member.model';
import { Team } from './team.model';

export interface MonthlyAward {
  id: string;
  projectId: string;
  awardableId: string;
  awardableType: string;
  value: number;
  month: string;
  project?: Project;
  awardable?: Member | Team;
}