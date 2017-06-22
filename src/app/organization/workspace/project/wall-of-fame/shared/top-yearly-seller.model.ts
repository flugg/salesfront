import { Membership } from '../../../../shared/membership.model';

export interface TopYearlySeller {
  id: string;
  membershipId: string;
  value: number;
  year: string;
  createdAt: string;
  updatedAt: string;
  membership?: Membership;
}