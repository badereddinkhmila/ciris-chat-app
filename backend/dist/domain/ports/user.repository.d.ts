import { Optional } from 'typescript-optional';
import User from '../user.model';
export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    getByEmail(email: string): Promise<Optional<User>>;
    getByID(id: string): Promise<Optional<User>>;
    createUser(user: User): Promise<Optional<User>>;
}
