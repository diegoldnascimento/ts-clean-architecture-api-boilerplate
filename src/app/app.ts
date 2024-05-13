import express from "express";
import { Router } from "express";
import { AccountRepository } from "../domain/repository/accountRepository";
import { AccountInMemoryRepository } from "../infra/repository/account/accountInMemoryRepository";
import { container } from "./app.container";
import { CreateAccountHttpResponseModel } from "./controllers/account/createAccountController";
import { AccountControllerFactory } from "./factory/controllers/accountControllerFactory";
import { AccountUseCaseFactory } from "./factory/useCases/accountUseCaseFactory";
import {
  GenericHttpResponsePresenter as HttpResponsePresenter,
  GenericHttpSuccess,
} from "./presentation/http/httpResponse";

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

  app.listen(3001, () => {
    console.log("localhost:3001 is running");
  });
})();
