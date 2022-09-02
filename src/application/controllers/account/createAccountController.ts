import CreateAccountUseCase from '../../useCases/account/createAccountUseCase';
import { httpResponse } from '../../../presentation/http/httpRespose';

interface Controller {
  handleRequest: (req: any, res: any) => void;
}

export default class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase
  ) {}

  async handleRequest(_req: any, _res: any) {
    const body: any = null;

    if (!body) {
      console.log('Bad Request', 400)
    }

    if (body) {
      console.log('Success', 201)
    } 

    console.log({_req}, await this.createAccountUseCase.execute({ ownerName: 'test' }))

    return _res.json(
      httpResponse({
        ownerName: 'test'
      })
    )
  }
}