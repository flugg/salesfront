import { Member } from './member.model';

export interface User {
  id: string,
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthdate?: string;
  avatarPath?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  memberships?: Member[];
}