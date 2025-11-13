import { BaseService } from './base.service';
import type { Category, CrudRepository } from '@/types';
import { CategoryModel } from '@/models/category.model';

export interface ICategoryService extends CrudRepository<Category, Category> {}

export class CategoryService
  extends BaseService<Category, Category>
  implements ICategoryService
{
  constructor() {
    super('categories');
  }

  async getAll(): Promise<CategoryModel[]> {
    const categories = await super.getAll();
    return categories.map((cat) => new CategoryModel(cat));
  }
}
