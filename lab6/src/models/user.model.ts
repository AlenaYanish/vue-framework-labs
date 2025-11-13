import { BaseModel } from './base.model';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface User {
  id: number;
  email: string;
  password?: string; 
  name: string;
  role: UserRole;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export interface UserDto {
  email: string;
  name: string;
  password?: string;
  role: UserRole;
  avatar: string;
}

export class UserModel extends BaseModel implements User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  creationAt: string;
  updatedAt: string;

  constructor(data: User) {
    super(data);
    this.init(data);
  }
}
