import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import User from '../../../domain/user.model';
import { UserRepository } from '../../../domain/ports/user.repository';
export default class UserRepositoryPostgres implements UserRepository {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    getAllUsers(): Promise<User[]>;
    getByEmail(email: string): Promise<Optional<User>>;
    getByID(id: string): Promise<Optional<User>>;
    createUser(user: User): Promise<Optional<User>>;
}
