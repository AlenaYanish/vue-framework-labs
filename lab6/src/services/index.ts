import { CategoryService, type ICategoryService } from './categories.service';
import { ProductService, type IProductService } from './product.service';
import { UserService, type IUserService } from './user.service';

interface IServiceProvider {
  categoryService: ICategoryService;
  productService: IProductService;
  userService: IUserService;
}
class ServiceProvider implements IServiceProvider {
  public categoryService: ICategoryService = new CategoryService();
  public productService: IProductService = new ProductService();
  public userService: IUserService = new UserService();

  constructor() {}
}

export const serviceProvider = new ServiceProvider();
