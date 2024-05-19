import { DocumentStore } from "ravendb";

interface Repository {

}

export class ProductsRavenDbRepository implements Repository {
  private dbClient;
  private dbSession;
  constructor() {
    this.dbClient = new DocumentStore("http://live-test.ravendb.net", "test");
    this.dbClient.initialize();

    this.dbSession = this.dbClient.openSession();
  }

  createProduct() {
    (async () => {
      const product = {
        id: null,
        title: "iPhone X",
        price: 999.99,
        currency: "USD",
        storage: 64,
        manufacturer: "Apple",
        in_stock: true,
        last_update: new Date("2017-10-01T00:00:00"),
      };

      const promise = async (i: number) => {
        const startTime = performance.now();
        await this.dbSession.store(product, `products/${1}-A`);

        console.log(product); // products/1-A
        await this.dbSession.saveChanges();

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
