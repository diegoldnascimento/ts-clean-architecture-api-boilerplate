import CreateAccountUseCase from './useCases/account/createAccountUseCase';
import AccountRepositoryMemory from '../infra/repository/accountRepositoryMemory';
import express from 'express';
import { Router, Request, Response } from 'express';
import { createAccountControllerFactory } from '../main/factories/controllers/account/createAccountControllerFactory';

const app = express();
const router = Router();

app.use(express.json());

(async () => {
  // Test the use case in action
  router.get('/', async (req, res) => {
    const { createAccountController } = createAccountControllerFactory()
    await createAccountController.handleRequest(req, res);

    res.json({
      status: 'ok'
    })
  });

  app.use(router)

  app.listen(3001, () => {
    console.log('localhost:3001 is running')
  })
})();

