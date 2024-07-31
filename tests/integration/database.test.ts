import dbclient from '../../src/config/database';

// Spy on console.log
console.log = jest.fn();

describe('DBClient', () => {
  it('should connect to the database', async () => {
    await dbclient.connect();
    expect(console.log).toHaveBeenCalledWith('Connected to MongoDB');
    expect(dbclient.isConnected()).toBe(true);
  });
});
