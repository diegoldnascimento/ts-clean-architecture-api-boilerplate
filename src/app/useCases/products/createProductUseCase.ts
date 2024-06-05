import { Either, left, right } from "../../../domain/errors/either/either";
import { ProductRepository } from "../../../domain/repositories/productRepository";
import UseCase from "../../../domain/useCases/account/useCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";

type Input = {
  title: string;
  price: number;
  currency: string;
  storage: number;
  manufacturer: string;
  in_stock: boolean;
};

type Output = Either<
  MissingParamsError | Error,
  {
    id: string;
    title: string;
    price: number;
    currency: string;
    storage: number;
    manufacturer: string;
    in_stock: boolean;
    last_update: Date;
  }
>;

export class CreateProductUseCase implements UseCase<Input, Output> {
  constructor(readonly productsRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const productCreated = await this.productsRepository.create({
      ...input,
    });

    if (!productCreated) {
      return left(new MissingParamsError("account"));
    }

    return right({
      ...productCreated,
    });
  }
}
