import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";
import { Request, Response } from "express";
import { httpResponse } from "../../presentation/http/httpResponse";
import { MissingParamsError } from "../../errors/common/missingParamsError";

interface Controller {
  handle: (req: Request, res: Response) => Promise<Response>;
}

export default class CreateAccountController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const body: any = null;

      if (!body) {
        throw new MissingParamsError("body");
      }

      const accountCreated = await this.createAccountUseCase.execute({ ownerName: "test" });

      return res.status(201).json(
        httpResponse({
          ownerName: "test",
        }),
      );
    } catch (err) {
      if (err instanceof MissingParamsError) {
        const fieldName = err.message; 
        return res.status(400).json({
          error: `Missing parameter: ${fieldName}`,
        });
      } else {
        return res.status(500).json({
          status: err.message || "Internal Server Error",
        });
      }
    }
  }
}

