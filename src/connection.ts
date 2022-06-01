import { createConnection, getConnection, Repository } from 'typeorm';

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear(tableName: string) {
    const connection = getConnection();
    const repository = connection.getRepository(tableName);
    await repository.query(`DELETE FROM ${tableName}`);
  },

  getRepository(tableName: string): Repository<any> {
    const connection = getConnection();
    return connection.getRepository(tableName);
  },
};
export default connection;
