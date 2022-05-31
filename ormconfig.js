module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'teste',
  entities: ['src/database/entities/*{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },
  //dropSchema: true,
  /*
  logging: false,
*/
};
