import { Sale } from './sale.model';
import { ContractTemplate } from './contract-template.model';

export interface Contract {
  id: string;
  fields: any;
  signature: string;
  templateId: string;
  saleId: string;
  template?: ContractTemplate;
  sale?: Sale;
}
