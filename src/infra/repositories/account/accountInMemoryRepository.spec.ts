import { AccountInMemoryRepository } from "./accountInMemoryRepository";

describe("accountRepositoryMemory", () => {
  let accountRepository: any;

  beforeEach(() => {
    accountRepository = new AccountInMemoryRepository();
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
