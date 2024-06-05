import { Repository } from "../../../domain/repositories/repository";
import { ProductDTO } from "../../dtos/products/productDTO";

export class ProductsInMemoryRepository implements Repository {
  private products: ProductDTO[];

  constructor() {}

  create(product: ProductDTO) {
    this.products.push(product)
    return product;
  }
}
