import { Project } from './project.model';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  projects?: Project[];
}