"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InfrastructureModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_usecase_1 = require("../application/auth.usecase");
const application_module_1 = require("../application/application.module");
const accessToken_strategy_1 = require("./auth/accessToken.strategy");
const refreshToken_strategy_1 = require("./auth/refreshToken.strategy");
const accessToken_guard_1 = require("./auth/guards/accessToken.guard");
const refreshToken_guard_1 = require("./auth/guards/refreshToken.guard");
const auth_controller_1 = require("./controllers/auth.controller");
let InfrastructureModule = InfrastructureModule_1 = class InfrastructureModule {
    static foorRoot() {
        return {
            module: InfrastructureModule_1,
            imports: [
                application_module_1.ApplicationModule,
                auth_usecase_1.default,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({}),
            ],
            providers: [
                accessToken_strategy_1.AccessTokenStrategy,
                refreshToken_strategy_1.RefreshTokenStrategy,
                accessToken_guard_1.AccessTokenGuard,
                refreshToken_guard_1.RefreshTokenGuard,
            ],
            exports: [prisma_service_1.PrismaService],
            controllers: [auth_controller_1.AuthController],
        };
    }
};
InfrastructureModule = InfrastructureModule_1 = __decorate([
    (0, common_1.Module)({})
], InfrastructureModule);
exports.default = InfrastructureModule;
//# sourceMappingURL=infrastructure.module.js.map