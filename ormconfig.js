module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'teste',
  synchronize: true,
  entities: ['src/database/entities/*{.ts,.js}'],
  //dropSchema: true,
  /*
  logging: false,
  migrationsRun: true,

  migrations: ['src/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },*/
};
