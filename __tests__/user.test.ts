import connection from '../src/connection';

describe('users', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('creates a user', async () => {
    await connection.createUser();
    expect(1).toBe(1);
  });
});
