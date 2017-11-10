import { Project } from './project.model';

export interface Product {
  id: string;
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  projectId: string;
  project?: Project;
}