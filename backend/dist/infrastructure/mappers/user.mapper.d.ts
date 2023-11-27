import { Optional } from 'typescript-optional';
import User from '../../domain/user.model';
import { PrismaService } from '../prisma.service';
export default class ProductMapper {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    static toDomain(user: User): Optional<User>;
    static toDomains(users: any[]): User[];
}
