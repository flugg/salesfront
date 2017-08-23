import { Project } from './project.model';
import { Member } from './member.model';
import { Team } from './team.model';

export interface YearlyAward {
  id: string;
  projectId: string;
  awardableId: string;
  awardableType: string;
  value: number;
  year: number;
  project?: Project;
  awardable?: Member | Team;
}