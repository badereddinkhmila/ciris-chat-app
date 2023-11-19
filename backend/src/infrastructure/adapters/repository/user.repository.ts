import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import User from '../../../domain/user.model';
import { UserRepository } from '../../../domain/ports/user.repository';

@Injectable()
export default class UserRepositoryPostgres implements UserRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this._prismaService.user.findMany();
  }
  async getByEmail(email: string): Promise<Optional<User>> {
    return Optional.ofNullable(
      await this._prismaService.user.findUnique({
        where: {
          email: email,
        },
      }),
    );
  }
  async getByID(id: string): Promise<Optional<User>> {
    return Optional.of(
      await this._prismaService.user.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }
  async createUser(user: User): Promise<Optional<User>> {
    return Optional.of(
      await this._prismaService.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
        },
      }),
    );
  }
}
