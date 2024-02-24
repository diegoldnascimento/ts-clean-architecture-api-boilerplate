import CreateAccountUseCase from '../../useCases/account/createAccountUseCase';
import { Request, Response } from 'express';
import { httpResponse } from '../../presentation/http/httpResponse';

interface Controller {
  handle: (req: Request, res: Response) => Promise<Request>;
}

export default class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Request> {
    try {
      const body: any = null;

      if (!body) {
        console.log('Bad Request', 400)
      }
  
      if (body) {
        console.log('Success', 201)
      } 
  
      console.log({req}, await this.createAccountUseCase.execute({ ownerName: 'test' }))
  
      return res.status(201).json(
        httpResponse({
          ownerName: 'test'
        })
      );
    } catch (err) {
      return res.status(500).json({
        status: err.message || 'Internal Server Error'
      });
    }
  }
}
