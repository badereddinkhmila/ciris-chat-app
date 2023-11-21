"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = require("./prisma.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const application_module_1 = require("../application/application.module");
const accessToken_strategy_1 = require("./auth/accessToken.strategy");
const refreshToken_strategy_1 = require("./auth/refreshToken.strategy");
const accessToken_guard_1 = require("./auth/guards/accessToken.guard");
const refreshToken_guard_1 = require("./auth/guards/refreshToken.guard");
const auth_controller_1 = require("./controllers/auth.controller");
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./controllers/users.controller");
const chatroom_controller_1 = require("./controllers/chatroom.controller");
const socket_gateway_1 = require("./socket/socket.gateway");
const user_repository_1 = require("./adapters/repository/user.repository");
const config_1 = require("@nestjs/config");
let InfrastructureModule = class InfrastructureModule {
};
InfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [application_module_1.ApplicationModule, passport_1.PassportModule, jwt_1.JwtModule.register({})],
        providers: [
            accessToken_strategy_1.AccessTokenStrategy,
            refreshToken_strategy_1.RefreshTokenStrategy,
            accessToken_guard_1.AccessTokenGuard,
            refreshToken_guard_1.RefreshTokenGuard,
            prisma_service_1.PrismaService,
            socket_gateway_1.SocketGateway,
            config_1.ConfigService,
            jwt_1.JwtService,
            {
                provide: 'UserRepository',
                useClass: user_repository_1.default,
            },
        ],
        controllers: [auth_controller_1.AuthController, users_controller_1.UsersController, chatroom_controller_1.ChatroomController],
    })
], InfrastructureModule);
exports.default = InfrastructureModule;
//# sourceMappingURL=infrastructure.module.js.map