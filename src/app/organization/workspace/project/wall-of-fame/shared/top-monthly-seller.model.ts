import { Membership } from '../../../../shared/membership.model';

export interface TopMonthlySeller {
  id: string;
  membershipId: string;
  value: number;
  soldAt: string;
  createdAt: string;
  updatedAt: string;
  membership?: Membership;
}