import { UserRepository } from '../database/repository/UserRepository';

export class UserReport {
  constructor(private readonly userRepository: UserRepository) {}

  async yearUserApplication(): Promise<resultDTO[]> {
    const sql = `select age, count(*) as total from user group by age  ORDER  by age  `;
    return await this.userRepository.query(sql);
  }
}

type resultDTO = {
  age: number;
  total: number;
};
