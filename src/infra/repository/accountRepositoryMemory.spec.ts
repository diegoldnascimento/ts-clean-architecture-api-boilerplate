import { InMemoryAccountRepository } from "./accountRepositoryMemory";

describe("accountRepositoryMemory", () => {
  let accountRepository: any;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
  });

  it("should create an account", () => {
    const account = accountRepository.create({
      name: "John Doe",
      email: "test@email.com",
      bank: {
        name: "Test Bank",
        code: "123",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    expect(account).toHaveProperty("id");
  });
});
