import { Project } from './project.model';
import { ContractTemplate } from './contract-template.model';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  projects?: Project[];
  contractTemplates?: ContractTemplate[];
}