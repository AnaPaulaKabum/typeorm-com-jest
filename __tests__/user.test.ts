import connection from '../src/connection';
import { User } from '../src/database/entities/User';

describe('users', () => {
  //Executa uma função antes de qualquer um dos testes
  beforeAll(async () => {
    await connection.create();
    await connection.clear('user');
  });
  //Executa uma função depois de qualquer um dos testes

  //Limpar os registros depois de cada teste.
  afterEach(async () => {
    //await connection.clear('user');
  });

  afterAll(async () => {
    await connection.close();
  });
  it('creates a user', async () => {
    const user = new User();
    user.age = 19;
    user.firstName = 'ana';
    user.lastName = 'paula';
    await connection.createUser(user);
    expect(1).toBe(1);
  });
});
