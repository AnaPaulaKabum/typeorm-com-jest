import connection from '../src/database/connection';
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
  afterEach(async () => {
    await connection.clear('user');
  });

  //Executa uma função depois do grupo de testes
  afterAll(async () => {
    await connection.close();
  });
  it('create a user', async () => {
    const user = createUserFake();
    const userSave = await userRepository.save(user);
    expect(userSave.id).toBeTruthy();
  });

  it('update user', async () => {
    const userUpdate = createUserFake();
    const userSave = await userRepository.save(userUpdate);
    userUpdate.age = 26;
    userUpdate.firstName = 'ana';

    const resultUpdate = await userRepository.update(userSave.id, userUpdate);
    expect(resultUpdate?.id).toBe(userSave.id);
    expect(resultUpdate?.age).toBe(userUpdate.age);
    expect(resultUpdate?.lastName).toBe(userUpdate.lastName);
    expect(resultUpdate?.firstName).toBe(userUpdate.firstName);
  });

  it('findAll user', async () => {
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);
  });

  it('findAll with 1 register', async () => {
    const user = createUserFake();
    await userRepository.save(user);

    let listUser = await userRepository.findAll();
    expect(listUser.length).toBe(1);
  });

  it('delete user', async () => {
    const userUpdate = new User();
    const user = createUserFake();
    const userSave = await userRepository.save(userUpdate);

    await userRepository.delete(userSave.id);
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);
  });
});

const createUserFake = (): User => {
  const user = new User();
  user.age = 25;
  user.firstName = 'ana paula';
  user.lastName = 'fernandes';
  return user;
};
