import connection from '../src/connection';
import { User } from '../src/database/entities/User';
import { UserRepository } from '../src/database/repository/UserRepository';

describe('users', () => {
  let userRepository: UserRepository;

  //Executa uma função antes de qualquer um dos testes
  beforeAll(async () => {
    const tableName = 'user';
    await connection.create();
    await connection.clear(tableName);
    userRepository = new UserRepository(connection.getRepository(tableName));
  });

  //Limpar os registros depois de cada teste.
  afterEach(async () => {
    //await connection.clear('user');
  });

  //Executa uma função depois de qualquer um dos testes
  afterAll(async () => {
    await connection.close();
  });
  it('creates a user', async () => {
    const user = new User();
    user.age = 19;
    user.firstName = 'ana';
    user.lastName = 'paula';
    const userSave = await userRepository.save(user);
    expect(userSave.id).toBeTruthy();
  });
});
