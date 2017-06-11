export interface User {
  id: string,
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthdate?: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}