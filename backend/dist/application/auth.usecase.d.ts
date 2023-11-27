import UserFactory from './factories/user.factory';
import { UserRepository } from '../domain/ports/user.repository';
import UserCommand from './commands/user.command';
import LoginCommand from './commands/login.command';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export default class AuthUsecase {
    private _userRepository;
    private _userFactory;
    private _jwtService;
    private _configService;
    constructor(_userRepository: UserRepository, _userFactory: UserFactory, _jwtService: JwtService, _configService: ConfigService);
    handleRegister(_userCommand: UserCommand): Promise<any>;
    handleLogin(_loginCommand: LoginCommand): Promise<any>;
    handleRefreshTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
        currentUserId: string;
    }>;
    handleGetAllUsers(currentUser: string): Promise<import("../domain/user.model").default[]>;
    getTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
        currentUserId: string;
    }>;
    private hashPassword;
    private verifyPassword;
}
