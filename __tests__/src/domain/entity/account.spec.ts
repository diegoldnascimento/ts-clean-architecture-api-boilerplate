import Account from '../../../../src/domain/entity/Account';

describe("Account", () => {
  describe("constructor", () => {
    it('should receive the correct parameters and return the expected result', () => {
      const account = new Account('1', 'Diego Lopes', {
        id: '1',
        name: 'foo',
        code: 'fooBank',
        accounts: []
      });

      expect(account.id).toBe('1')
      expect(account.ownerName).toBe('Diego Lopes')
      expect(account.bank.id).toBe('1')
      expect(account.bank.name).toBe('foo')
      expect(account.bank.code).toBe('fooBank')
    })
  })
})