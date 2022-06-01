import connection from '../src/connection';
import { User } from '../src/database/entities/User';
import { UserRepository } from '../src/database/repository/UserRepository';

describe('users', () => {
  let userRepository: UserRepository;

  //Executa uma função para o grupo de testes
  beforeAll(async () => {
    const tableName = 'user';
    await connection.create();
    await connection.clear(tableName);
    userRepository = new UserRepository(connection.getRepository(tableName));
  });

  //fazer algo a cada teste
  beforeEach(async () => {
    await connection.clear('user');
  });

  //Executa uma função depois do grupo de testes
  afterAll(async () => {
    await connection.close();
  });
  it('creates a user', async () => {
    const user = new User();
    user.age = 19;
    user.firstName = 'ana';
    user.lastName = 'fernandes';
    const userSave = await userRepository.save(user);
    expect(userSave.id).toBeTruthy();
  });

  it('findAll user', async () => {
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);
  });
});
