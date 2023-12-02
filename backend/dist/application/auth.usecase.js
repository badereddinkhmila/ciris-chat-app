"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_factory_1 = require("./factories/user.factory");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthUsecase = class AuthUsecase {
    constructor(_userRepository, _userFactory, _jwtService, _configService) {
        this._userRepository = _userRepository;
        this._userFactory = _userFactory;
        this._jwtService = _jwtService;
        this._configService = _configService;
    }
    async handleRegister(_userCommand) {
        const userExist = await this._userRepository.getByEmail(_userCommand.email);
        if (userExist.isPresent())
            throw new common_1.BadRequestException('User already exists');
        _userCommand.password = await this.hashPassword(_userCommand.password);
        const user = this._userFactory.createUser(_userCommand);
        const newUser = await this._userRepository.createUser(user);
        if (newUser.isEmpty()) {
            throw new Error('Error signing up');
        }
        return await this.getTokens(newUser.get().id, newUser.get().email);
    }
    async handleLogin(_loginCommand) {
        const userExist = await this._userRepository.getByEmail(_loginCommand.email);
        if (userExist.isEmpty())
            throw new common_1.BadRequestException('User does not exist');
        const passwordMatches = await this.verifyPassword(_loginCommand.password, userExist.get().password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Password is incorrect');
        return await this.getTokens(userExist.get().id, userExist.get().email);
    }
    async handleRefreshTokens(userId, email) {
        return await this.getTokens(userId, email);
    }
    async handleGetAllUsers() {
        return await this._userRepository.getAllUsers();
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this._jwtService.signAsync({
                sub: userId,
                username: email,
            }, {
                secret: this._configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '7d',
            }),
            this._jwtService.signAsync({
                sub: userId,
                username: email,
            }, {
                secret: this._configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '30d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
            currentUserId: userId,
        };
    }
    async hashPassword(password) {
        try {
            return await argon2.hash(password, {
                hashLength: 50,
            });
        }
        catch (error) {
            throw new Error('Error hashing password');
        }
    }
    async verifyPassword(password, hash) {
        try {
            return await argon2.verify(hash, password, {
                hashLength: 50,
            });
        }
        catch (err) {
            throw new Error('Issue while verifying password');
        }
    }
};
AuthUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object, user_factory_1.default,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthUsecase);
exports.default = AuthUsecase;
//# sourceMappingURL=auth.usecase.js.map