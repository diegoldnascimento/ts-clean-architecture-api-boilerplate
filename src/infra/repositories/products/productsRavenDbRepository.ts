import { Repository } from "../../../domain/repositories/repository";
import { RavenDbClient } from "../../adapters/db/ravendb/ravendbClient";
import { ProductDTO } from "../../dtos/products/productDTO";

export class ProductsRavenDbRepository implements Repository {
  constructor(private readonly ravenDbClient: RavenDbClient) {}

  async create(product: ProductDTO) {
    const startTime = performance.now();

    await this.ravenDbClient.store(product, `products/${1}-A`);

    await this.ravenDbClient.saveChanges();

    const endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} ms`);

    return product;
  }
}
