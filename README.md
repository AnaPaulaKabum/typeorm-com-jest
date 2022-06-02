# Teste com Jest e TypeORM


Repositório: src/database/repository/UserRepository.ts

Teste: __tests__/user.test.ts

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

Create: Testando se retornou Truthy, ou seja que não seja falsy (false, 0, '',undefined, null, NaN)

```
    const user = createUserFake();
    const userSave = await userRepository.save(user);
    expect(userSave.id).toBeTruthy();
``` 

Read:

Dividido em dois testes, primeiro testando quando não possui nenhum registro no banco:

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



Update: Será inserido um registro, e depois será modificado. O teste será se os campos foram atualizados.

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

Delete: Será inserido um usuário e depois deletado, ao pesquisar pelos registros no banco deverá ser encontrado 0 registros.

```

    const userUpdate = new User();
    const user = createUserFake();
    const userSave = await userRepository.save(userUpdate);

    await userRepository.delete(userSave.id);
    const listUser = await userRepository.findAll();
    expect(listUser.length).toBe(0);

```



## Criar migration:

yarn typeorm migration:create -n NameMigration
