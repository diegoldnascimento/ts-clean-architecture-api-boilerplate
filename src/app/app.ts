import express from "express";
import { Router } from "express";
import { AccountRepository } from "../domain/repository/accountRepository";
import { InMemoryAccountRepository } from "../infra/repository/accountRepositoryMemory";
import { container } from "./app.container";
import { AccountControllerFactory } from "./factory/controllers/accountControllerFactory";
import { AccountUseCaseFactory } from "./factory/useCases/accountUseCaseFactory";

container.register("AccountRepository", new InMemoryAccountRepository());

const app = express();
const router = Router();

app.use(express.json());

(async () => {
  // Test the use case in action
  router.get("/", async (req, res) => {
    const accountRepository = container.resolve<AccountRepository>("AccountRepository"); 
    const accountUseCaseFactory = new AccountUseCaseFactory(accountRepository);
    const accountControllerFactory = new AccountControllerFactory(
      accountUseCaseFactory
    );

    await accountControllerFactory.createAccountController().handle(req, res);
  });

  router.get("/1", async (req, res) => {
    const accountRepository = container.resolve<AccountRepository>("AccountRepository"); 
    const accountUseCaseFactory = new AccountUseCaseFactory(accountRepository);
    const accountControllerFactory = new AccountControllerFactory(
      accountUseCaseFactory
    );

    await accountControllerFactory.createAccountController().handle(req, res);

  });

  app.use(router);

  app.listen(3001, () => {
    console.log("localhost:3001 is running");
  });
})();
