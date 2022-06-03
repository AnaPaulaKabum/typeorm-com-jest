import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.query(`select * from user`);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      id: id,
    });
  }

  async update(id: number, user: User): Promise<User | undefined> {
    const rows_affected = 1;
    const result = await this.userRepository.update(
      { id: id },
      { firstName: user.firstName, lastName: user.lastName, age: user.age },
    );

    if (!result.affected) return undefined;

    if (result.affected === rows_affected) {
      return this.findOne(id);
    }
    return undefined;
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete({ id: id });
  }

  async query(sql: string): Promise<any> {
    return this.userRepository.query(sql);
  }
}
