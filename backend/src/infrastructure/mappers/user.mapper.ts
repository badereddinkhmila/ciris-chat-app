import { Optional } from 'typescript-optional';
import User from '../../domain/user.model';
import { PrismaService } from '../prisma.service';

export default class ProductMapper {
  constructor(private readonly _prismaService: PrismaService) {}

  public static toDomain(user: User): Optional<User> {
    if (!user) {
      return Optional.empty<User>();
    }
    const mappedUser = new User(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.password,
    );

    return Optional.of(mappedUser);
  }

  public static toDomains(users: any[]): User[] {
    const usersMap = new Array<User>();
    users.forEach((user) => {
      const mappedUser = this.toDomain(user);
      usersMap.push(mappedUser.get());
    });
    return usersMap;
  }
}
