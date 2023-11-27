import { Request } from 'express';
import AuthUsecase from '../../application/auth.usecase';
import UserCommand from '../../application/commands/user.command';
import LoginCommand from '../../application/commands/login.command';
export declare class AuthController {
    private _authUsecase;
    constructor(_authUsecase: AuthUsecase);
    signup(_userCommand: UserCommand): Promise<any>;
    signin(_loginCommand: LoginCommand): Promise<any>;
    refreshTokens(_req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
        currentUserId: string;
    }>;
}
