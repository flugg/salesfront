import { ContractTemplate } from './contract-template.model';

export interface ContractField {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  templateId: string;
  template?: ContractTemplate;
}
