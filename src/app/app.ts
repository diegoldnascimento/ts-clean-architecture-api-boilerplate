import express from "express";
import { Router } from "express";
import { AccountRepository } from "../domain/repositories/accountRepository";
import { RavenDbClient } from "../infra/adapters/db/ravendb/ravendbClient";
import { AccountInMemoryRepository } from "../infra/repositories/account/accountInMemoryRepository";
import { ProductsRavenDbRepository } from "../infra/repositories/products/productsRavenDbRepository";
import { container } from "./app.container";
import { CreateAccountResponse } from "./controllers/account/createAccountController";
import CreateProductController from "./controllers/products/createProductController";
import { AccountControllerFactory } from "./factories/controllers/accountControllerFactory";
import { AccountUseCaseFactory } from "./factories/useCases/accountUseCaseFactory";
import { GenericHttpResponsePresenter as HttpResponsePresenter } from "./presentation/http/httpResponse";
import { CreateProductUseCase } from "./useCases/products/createProductUseCase";

container.register(
  "RavenDbClient",
  new RavenDbClient("http://live-test.ravendb.net", "test"),
);
container.register("AccountRepository", new AccountInMemoryRepository());

const app = express();
const router = Router();

app.use(express.json());

(async () => {
  router.get("/", async (req, res) => {
    const accountRepository =
      container.resolve<AccountRepository>("AccountRepository");
    const accountUseCaseFactory = new AccountUseCaseFactory(accountRepository);
    const presenter = new HttpResponsePresenter<CreateAccountResponse>();
    const accountControllerFactory = new AccountControllerFactory(
      accountUseCaseFactory,
      presenter,
    );

    const response = await accountControllerFactory
      .createAccountController()
      .handleRequest(req);

    res.send(response);
  });

  router.get("/products", async (req, res) => {
    const ravenDbClient = container.resolve<RavenDbClient>("RavenDbClient");
    const productsRavenDbRepository = new ProductsRavenDbRepository(
      ravenDbClient,
    );
    const presenter = new HttpResponsePresenter<CreateAccountResponse>();
    const createProductUseCase = new CreateProductUseCase(
      productsRavenDbRepository,
    );
    const createProductController = new CreateProductController(
      createProductUseCase,
      presenter,
    );
    const response = await createProductController.handleRequest(req);

    res.send(response);
  });

  app.use(router);

  app.listen(3001, () => {
    console.log("localhost:3001 is running");
  });
})();
