import { Repository } from "../../../domain/repository/repository";
import { RavenDbClient } from "../../adapters/db/ravendb/ravendbClient";
import { ProductDTO } from "../../dtos/products/productDTO";

export class ProductsRavenDbRepository implements Repository {
  constructor(private readonly ravenDbClient: RavenDbClient) {}

  create(product: ProductDTO) {
    (async () => {
      const promise = async (i: number) => {
        const startTime = performance.now();

        await this.ravenDbClient.store(product, `products/${1}-A`);

        await this.ravenDbClient.saveChanges();

        const endTime = performance.now();

        console.log(`Call to doSomething took ${endTime - startTime} ms`);
      };

      const promises = [];

      for (let i = 0; i <= 20; i++) {
        promises.push(promise(i));

        if (i % 5 == 0) {
          const result = Promise.all(promises).then(() => {
            console.log("Foi!");
          });
        }
      }

      console.log("Oi!");
    })();
  }
}
