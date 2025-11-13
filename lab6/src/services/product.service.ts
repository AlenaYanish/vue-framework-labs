import { BaseService } from './base.service';
import type { CrudRepository } from '@/types';
import type { Product, ProductDto } from '@/models/product.model';
import { ProductModel } from '@/models/product.model';

export interface IProductService extends CrudRepository<Product, ProductDto> {}

export class ProductService
  extends BaseService<Product, ProductDto>
  implements IProductService
{
  constructor() {
    super('products');
  }

  async getAll(): Promise<ProductModel[]> {
    const products = await super.getAll();
    return products.map((p) => new ProductModel(p));
  }
  
  async getById(id: number): Promise<ProductModel> {
    const product = await super.getById(id);
    return new ProductModel(product);
  }
}
