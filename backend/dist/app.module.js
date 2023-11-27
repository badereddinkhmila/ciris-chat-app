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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const domain_module_1 = require("./domain/domain.module");
const config_1 = require("./config");
const application_module_1 = require("./application/application.module");
const auth_controller_1 = require("./infrastructure/controllers/auth.controller");
const config_2 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let AppModule = AppModule_1 = class AppModule {
    constructor(_config) {
        AppModule_1.port = _config.get('APP_PORT');
        AppModule_1.clientUrl = _config.get('CLIENT_URL');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            infrastructure_module_1.default,
            domain_module_1.default,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({}),
            application_module_1.ApplicationModule,
            config_2.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_1.default],
            }),
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [config_2.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map