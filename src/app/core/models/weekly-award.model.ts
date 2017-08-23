import { Project } from './project.model';
import { Member } from './member.model';
import { Team } from './team.model';

export interface WeeklyAward {
  id: string;
  projectId: string;
  awardableId: string;
  awardableType: string;
  value: number;
  week: number;
  year: number;
  project?: Project;
  awardable?: Member | Team;
}