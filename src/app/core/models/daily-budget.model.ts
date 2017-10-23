import { Project } from './project.model';
import { BudgetGoal } from './budget-goal.model';

export interface DailyBudget {
  id: string;
  day: string;
  value: number;
  projectId: string;
  project?: Project;
  goals: BudgetGoal[];
}