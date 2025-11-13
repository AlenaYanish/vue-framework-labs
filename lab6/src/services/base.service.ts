import httpClient from '@/utils/http-client';
import type { CrudRepository } from '@/types';
import type { AxiosResponse } from 'axios';

export abstract class BaseService<T, D, ID = number>
  implements CrudRepository<T, D, ID>
{
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected handleResponse<R>(response: AxiosResponse<R>): R {
    return response.data;
  }

  protected getUrl(id?: ID): string {
    return id ? `${this.endpoint}/${id}` : this.endpoint;
  }

  // Read
  async getAll(params?: Record<string, any>): Promise<T[]> {
    const response = await httpClient.get<T[]>(this.getUrl(), { params });
    return this.handleResponse(response);
  }

  async getById(id: ID): Promise<T> {
    const response = await httpClient.get<T>(this.getUrl(id));
    return this.handleResponse(response);
  }

  // Create
  async create(data: D): Promise<T> {
    const response = await httpClient.post<T>(this.getUrl(), data);
    return this.handleResponse(response);
  }

  // Update
  async update(id: ID, data: D): Promise<T> {
    const response = await httpClient.put<T>(this.getUrl(id), data);
    return this.handleResponse(response);
  }

  // Delete
  async delete(id: ID): Promise<void> {
    await httpClient.delete(this.getUrl(id));
  }
}
