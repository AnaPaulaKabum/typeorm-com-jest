import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1654027064988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user (
            id int NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(250),
            lastName VARCHAR(250),
            age int,
            PRIMARY KEY (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP table user`);
  }
}
