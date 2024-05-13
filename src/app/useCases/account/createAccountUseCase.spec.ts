import { InMemoryAccountRepository } from "../../../infra/repository/accountRepositoryMemory";
import { CreateAccountUseCase } from "./createAccountUseCase";

const makeSut = () => {
  const accountRepository = new InMemoryAccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);

  return { createAccountUseCase, accountRepository };
};

describe("createAccountUseCase", () => {
  it("should create an account", () => {
    const { createAccountUseCase } = makeSut();

    // const account = createAccountUseCase.execute({
    //   ownerName: "John Doe",
    //   bank: {
    //     id: "1",
    //     name: "Nubank",
    //   },
    // });
    //
    // expect(account).toHaveProperty("id");
    // expect(account).toHaveProperty("ownerName", "John Doe");
  });

  it("should return null if account is not created", () => {
    const { createAccountUseCase, accountRepository } = makeSut();

    jest.spyOn(accountRepository, "create").mockReturnValue(null as never);

    const account = createAccountUseCase.execute({
      ownerName: "John Doe",
    });

    expect(account).toBeNull();
  });
});
