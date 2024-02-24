import express from "express";
import { Router } from "express";
import InMemoryAccountRepository from "../infra/repository/accountRepositoryMemory";
import { AccountControllerFactory } from "./factory/controllers/accountControllerFactory";
import { AccountUseCaseFactory } from "./factory/useCases/accountUseCaseFactory";
// import { createAccountControllerFactory } from "../main/factories/controllers/account/createAccountControllerFactory";

const app = express();
const router = Router();

app.use(express.json());

(async () => {
  // Test the use case in action
  router.get("/", async (req, res) => {
    const accountRepository = new InMemoryAccountRepository();
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
