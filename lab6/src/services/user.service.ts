import { BaseService } from './base.service';
import type { CrudRepository } from '@/types';
import type { User, UserDto } from '@/models/user.model';
import { UserModel } from '@/models/user.model';
import httpClient from '@/utils/http-client';

export interface IUserService extends CrudRepository<User, UserDto> {
  getProfile(token: string): Promise<UserModel>;
}

export class UserService
  extends BaseService<User, UserDto>
  implements IUserService
{
  constructor() {
    super('users');
  }

  async getAll(): Promise<UserModel[]> {
    const users = await super.getAll();
    return users.map((u) => new UserModel(u));
  }

  async getById(id: number): Promise<UserModel> {
    const user = await super.getById(id);
    return new UserModel(user);
  }

  async getProfile(token: string): Promise<UserModel> {
    const response = await httpClient.get<User>(`/api/v1/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return new UserModel(response.data);
  }
}
