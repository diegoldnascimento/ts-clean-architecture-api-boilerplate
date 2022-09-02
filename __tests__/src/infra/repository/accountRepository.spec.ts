
import type Account from '../../../../src/domain/entity/account';
import AccountRepository from '../../../../src/domain/repository/accountRepository';
import AccountRepositoryMemory from '../../../../src/infra/repository/accountRepositoryMemory';
describe("accountRepository", () => {
  describe("create", () => {
    it("should create a new account", () => {
      const accountRepository = new AccountRepositoryMemory();
      expect(accountRepository.getAll()).toHaveLength(0);
      const mockBank = {
        id: '1',
        name: 'foo',
        code: 'fooBank',
        accounts: [] as Account[]
      }
      const mockAccount = {
        id: '1',
        ownerName: 'Diego Lopes',
        bank: mockBank
      }

      const account = accountRepository.create(mockAccount);
      const accounts = accountRepository.getAll()
      expect(account.id).toBe(mockAccount.id)
      expect(account.ownerName).toBe(mockAccount.ownerName)
      expect(account.bank).toEqual(mockAccount.bank)
      expect(accounts).toHaveLength(1)
      expect(accounts).toEqual([
        mockAccount
      ])
    })
  })

  describe("get", () => {
    it("should retrieve an account successfully when the account id is provided", async () => {
      const bank = {
        id: '392',
        name: 'foo',
        code: 'fooBank',
        accounts: [] as Account[]
      }
      const account = {
        id: '382',
        ownerName: 'Diego Lopes',
        bank
      }
      const accountRepository = new AccountRepositoryMemory()
      accountRepository.create(account)
      expect(await accountRepository.get('382')).toEqual(account)
    })

    it("should retrieve no account when the account id is provided and does not exists", async () => {
      const bank = {
        id: '392',
        name: 'foo',
        code: 'fooBank',
        accounts: [] as Account[]
      }
      const account = {
        id: '382',
        ownerName: 'Diego Lopes',
        bank
      }
      const accountRepository = new AccountRepositoryMemory()
      accountRepository.create(account)
      expect(async () => accountRepository.get('fakeId')).rejects.toThrow(new Error('Account not found'))
    })
  })

  describe("update", () => {
    it("should update the account when the account data is provided", async () => {
      const bank = {
        id: '392',
        name: 'foo',
        code: 'fooBank',
        accounts: [] as Account[]
      }
      const givenAccount = {
        id: '382',
        ownerName: 'Diego Lopes',
        bank
      }
      const accountRepository = new AccountRepositoryMemory()
      await accountRepository.create(givenAccount)
      const account = await accountRepository.update({
        ...givenAccount,
        ownerName: 'Foo Name'
      })
      expect(account).toEqual({...givenAccount, ownerName: 'Foo Name'})
    })

    it("should throw an error when the account can not be updated", async () => {
      const bank = {
        id: '392',
        name: 'foo',
        code: 'fooBank',
        accounts: [] as Account[]
      }
      const givenAccount = {
        id: '382',
        ownerName: 'Diego Lopes',
        bank
      }
      const accountRepository = new AccountRepositoryMemory()
      await accountRepository.create(givenAccount)
      expect(async () => await accountRepository.update({
        ...givenAccount,
        id: 'foo-random-id',
        ownerName: 'Foo Name'
      })).rejects.toThrow('Account not found')
    })
  })
})