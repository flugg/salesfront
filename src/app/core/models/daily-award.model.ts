import { Project } from './project.model';
import { Member } from './member.model';
import { Team } from './team.model';

export interface DailyAward {
  id: string;
  projectId: string;
  awardableId: string;
  awardableType: string;
  value: number;
  day: string;
  project?: Project;
  awardable?: Member | Team;
}