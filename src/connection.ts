import { createConnection, getConnection } from 'typeorm';
import { User } from './database/entities/User';

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear(tablename: string) {
    const connection = getConnection();
    const repository = connection.getRepository(tablename);
    await repository.query(`DELETE FROM ${tablename}`);
  },

  async createUser(user: User) {
    const connection = getConnection();
    const repository = connection.getRepository(User);

    await repository.save(user);
  },
};
export default connection;
