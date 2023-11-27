"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const auth_usecase_1 = require("./auth.usecase");
const domain_module_1 = require("../domain/domain.module");
const user_repository_1 = require("../infrastructure/adapters/repository/user.repository");
const chatroom_factory_1 = require("./factories/chatroom.factory");
const message_factory_1 = require("./factories/message.factory");
const user_factory_1 = require("./factories/user.factory");
const chatroom_usecase_1 = require("./chatroom.usecase");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../infrastructure/prisma.service");
const config_1 = require("@nestjs/config");
const chatroom_repository_1 = require("../infrastructure/adapters/repository/chatroom.repository");
const message_repository_1 = require("../infrastructure/adapters/repository/message.repository");
const users_usecase_1 = require("./users.usecase");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            auth_usecase_1.default,
            users_usecase_1.default,
            chatroom_usecase_1.default,
            {
                provide: 'UserRepository',
                useClass: user_repository_1.default,
            },
            {
                provide: 'ChatroomRepository',
                useClass: chatroom_repository_1.default,
            },
            {
                provide: 'MessageRepository',
                useClass: message_repository_1.default,
            },
            user_factory_1.default,
            chatroom_factory_1.default,
            message_factory_1.default,
            config_1.ConfigService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
        ],
        imports: [domain_module_1.default],
        exports: [auth_usecase_1.default, chatroom_usecase_1.default, users_usecase_1.default],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map