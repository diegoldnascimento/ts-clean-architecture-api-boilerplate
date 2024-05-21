import express from "express";
import { Router } from "express";
import { AccountRepository } from "../domain/repository/accountRepository";
import { RavenDbClient } from "../infra/adapters/db/ravendb/ravendbClient";
import { AccountInMemoryRepository } from "../infra/repository/account/accountInMemoryRepository";
import { ProductsRavenDbRepository } from "../infra/repository/products/productsRavenDbRepository";
import { container } from "./app.container";
import { CreateAccountHttpResponseModel } from "./controllers/account/createAccountController";
import { AccountControllerFactory } from "./factory/controllers/accountControllerFactory";
import { AccountUseCaseFactory } from "./factory/useCases/accountUseCaseFactory";
import {
  GenericHttpResponsePresenter as HttpResponsePresenter,
  GenericHttpSuccess,
} from "./presentation/http/httpResponse";

container.register(
  "RavenDbClient",
  new RavenDbClient("http://live-test.ravendb.net", "test"),
);
container.register("AccountRepository", new AccountInMemoryRepository());

const app = express();
const router = Router();

app.use(express.json());

(async () => {
  // Test the use case in action
  router.get("/", async (req, res) => {
    const accountRepository =
      container.resolve<AccountRepository>("AccountRepository");
    const accountUseCaseFactory = new AccountUseCaseFactory(accountRepository);
    const presenter =
      new HttpResponsePresenter<CreateAccountHttpResponseModel>();
    const accountControllerFactory = new AccountControllerFactory(
      accountUseCaseFactory,
      presenter,
    );

    const response = await accountControllerFactory
      .createAccountController()
      .handleRequest(req);

    res.send(response);
  });

  app.use(router);

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

  const ravenDbClient = container.resolve<RavenDbClient>("RavenDbClient");

  const productsRavenDbRepository = new ProductsRavenDbRepository(
    ravenDbClient,
  );

  productsRavenDbRepository.create(product);

  app.listen(3001, () => {
    console.log("localhost:3001 is running");
  });
})();
