import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import UserFactory from './factories/user.factory';
import { UserRepository } from '../domain/ports/user.repository';
import UserCommand from './commands/user.command';
import * as argon2 from 'argon2';
import LoginCommand from './commands/login.command';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthUsecase {
  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _userFactory: UserFactory,
    private _jwtService: JwtService,
    private _configService: ConfigService,
  ) {}
  public async handleRegister(_userCommand: UserCommand): Promise<any> {
    const userExist = await this._userRepository.getByEmail(_userCommand.email);
    if (userExist.isPresent())
      throw new BadRequestException('User already exists');
    _userCommand.password = await this.hashPassword(_userCommand.password);
    const user = this._userFactory.createUser(_userCommand);
    const newUser = await this._userRepository.createUser(user);
    if (newUser.isEmpty()) {
      throw new Error('Error signing up');
    }
    return await this.getTokens(newUser.get().id, newUser.get().email);
  }

  public async handleLogin(_loginCommand: LoginCommand): Promise<any> {
    const userExist = await this._userRepository.getByEmail(
      _loginCommand.email,
    );
    if (userExist.isEmpty())
      throw new BadRequestException('User does not exist');
    const passwordMatches = await this.verifyPassword(
      _loginCommand.password,
      userExist.get().password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    return await this.getTokens(userExist.get().id, userExist.get().email);
  }

  public async handleRefreshTokens(userId: string, email: string) {
    return await this.getTokens(userId, email);
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: this._configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  private async hashPassword(password: string) {
    try {
      return await argon2.hash(password, {
        hashLength: 50,
      });
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  private async verifyPassword(password: string, hash: string) {
    try {
      return await argon2.verify(hash, password, {
        hashLength: 50,
      });
    } catch (err) {
      throw new Error('Issue while verifying password');
    }
  }
}
