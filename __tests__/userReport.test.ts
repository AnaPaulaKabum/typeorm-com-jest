import connection from '../src/database/connection';
import { User } from '../src/database/entities/User';
import { UserRepository } from '../src/database/repository/UserRepository';
import { UserSeed } from '../src/database/seed/UserSeed';
import { UserReport } from '../src/Report/UserReport';

describe('UserReport', () => {
  let userRepository: UserRepository;
  let userReport: UserReport;

  beforeAll(async () => {
    const tableName = 'user';
    await connection.create();
    await connection.clear(tableName);
    userRepository = new UserRepository(connection.getRepository(tableName));
    userReport = new UserReport(userRepository);
  });

  afterAll(async () => {
    await connection.clear('user');
    await connection.close();
  });
  it('yearUserApplication', async () => {
    const userSeed = new UserSeed(userRepository);
    await userSeed.generateFix(createUserFake());

    const result = await userReport.yearUserApplication();

    expect(result).toBeTruthy();
    expect(result[0].age).toBe(25);
    expect(result[0].total).toBe('2');
    expect(result[1].age).toBe(40);
    expect(result[1].total).toBe('1');
  });
});

const createUserFake = (): User[] => {
  const userOne = new User();
  userOne.age = 25;
  userOne.firstName = 'ana paula';
  userOne.lastName = 'fernandes';

  const userTwo = new User();
  userTwo.age = 40;
  userTwo.firstName = 'Jonh';
  userTwo.lastName = 'Back';

  const userThree = new User();
  userThree.age = 25;
  userThree.firstName = 'Bruce';
  userThree.lastName = 'Back';

  let listUser: Array<User> = [userOne, userTwo, userThree];

  return listUser;
};
