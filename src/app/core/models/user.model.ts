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
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  memberships?: Member[];
}