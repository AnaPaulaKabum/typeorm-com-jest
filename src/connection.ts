import { createConnection, getConnection } from 'typeorm';
import { User } from './database/entities/User';

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      console.log(entity.name);
      // const repository = connection.getRepository(entity.name);
      // await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },

  async createUser() {
    const connection = getConnection();
    const repository = connection.getRepository(User);

    const user = new User();
    user.age = 19;
    user.firstName = 'ana';
    user.lastName = 'paula';

    await repository.save(user);
  },
};
export default connection;
