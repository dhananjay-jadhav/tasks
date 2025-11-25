import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@tasks/sql-db';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { genSalt, hash } from 'bcrypt';

type ReturnUser = Omit<UserEntity, 'password'>;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async createUser(user: Omit<UserEntity, 'id'>): Promise<ReturnUser> {
    const salt = await genSalt(10);
    const password = await hash(user.password, salt);
    return this.userRepo.save({
      id: randomUUID(),
      ...user,
      password,
    });
  }

  async findOrFailByEmail(email: string) {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: {
          email,
        },
      });
      return user;
    } catch (err) {
      this.logger.error(err);
      throw new Error(`User not found with email: ${email}`);
    }
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({
      email,
    });
  }

  async updateUser(user: Omit<UserEntity, 'password'>): Promise<ReturnUser> {
    await this.findOneOrFail(user.id);
    return this.userRepo.save({
      ...user,
    });
  }

  async findOne(userId: string): Promise<ReturnUser | null> {
    return this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findOneOrFail(userId: string): Promise<ReturnUser> {
    return this.userRepo.findOneByOrFail({
      id: userId,
    });
  }
}
