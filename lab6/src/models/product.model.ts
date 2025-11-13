import { BaseModel } from './base.model';
import type { Category } from '@/types';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number; 
  images: string[];
}

export class ProductModel extends BaseModel implements Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;

  constructor(data: Product) {
    super(data);
    this.init(data);
  }
}
