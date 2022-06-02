# Teste com Jest e TypeORM


Repositório: src/database/repository/UserRepository.ts

Teste: \_\_tests\_\_/user.test.ts

## Arquivo de configuração do TypeORM:

Função synchronize é utilizada para criar o banco de acordo com as entitys, não é recomendavel para bancos em produção. Nesse exemplo em vez de utilizar esse recurso foi utilizado as migrations que possui comandos de criação, foi configurado pelas funções <i>migrations</i> que possui a o caminho e <i> migrationsRun</i> como true.

Função dropSchame é para descarta o esquema sempre que a fonte de dados está sendo inicializada, esse recurso vai ser controlado pelos testes.

Função logging ativa os recursos de log no terminal, nesse caso quero análisar apenas os de query.

Função cli.migrationsDir direnciona os arquivos de migrations ao utilizar o recurso cli.

``` 
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'teste',
  //synchronize: true,
  entities: ['src/database/entities/*{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
  logging: ['query'], //all
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  //dropSchema: true,
``` 
Mais informações em: https://typeorm.io/data-source-options#common-data-source-options


## Código de teste: 

Será executado antes do grupo (describe) de testes , responsavel por criar a conexão,limpar o banco e instanciar a variavel do repositorio:

``` 
  beforeAll(async () => {
    const tableName = 'user';
    await connection.create();
    await connection.clear(tableName);
    userRepository = new UserRepository(connection.getRepository(tableName));
  });

``` 

A cada teste deverá limpar os registros do banco, para não influenciar em outro teste:

```
  afterEach(async () => {
    await connection.clear('user');
  });
  
```

Ao finalizar todos os testes do grupo, será necessário fechar a conexão:

```
  afterAll(async () => {
    await connection.close();
  });

```
### Realizando teste de CRUD:

<b> Create:</b> Testando se retornou Truthy, ou seja que não seja falsy (false, 0, '',undefined, null, NaN)

```
    const user = createUserFake();
    const userSave = await userRepository.save(user);
    expect(userSave.id).toBeTruthy();
``` 

<b>Read:</b> Dividido em dois testes, primeiro testando quando não possui nenhum registro no banco:

```
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);
```
Segundo quando já possuir um registro:


```
    const user = createUserFake();
    await userRepository.save(user);

    let listUser = await userRepository.findAll();
    expect(listUser.length).toBe(1);
```

<b> Update: </b> Será inserido um registro, e depois será modificado. O teste será se os campos foram atualizados.

```
    const userUpdate = createUserFake();
    const userSave = await userRepository.save(userUpdate);
    userUpdate.age = 26;
    userUpdate.firstName = 'ana';

    const resultUpdate = await userRepository.update(userSave.id, userUpdate);
    expect(resultUpdate?.id).toBe(userSave.id);
    expect(resultUpdate?.age).toBe(userUpdate.age);
    expect(resultUpdate?.lastName).toBe(userUpdate.lastName);
    expect(resultUpdate?.firstName).toBe(userUpdate.firstName);
```
<b> Delete: </b> Será inserido um usuário e depois deletado, ao pesquisar pelos registros no banco deverá ser encontrado 0 registros.

```
    const userUpdate = new User();
    const user = createUserFake();
    const userSave = await userRepository.save(userUpdate);

    await userRepository.delete(userSave.id);
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);
```



### Criar migration:

yarn typeorm migration:create -n NameMigration
