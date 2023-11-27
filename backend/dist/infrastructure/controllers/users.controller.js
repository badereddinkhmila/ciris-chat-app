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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("../auth/guards/accessToken.guard");
const users_usecase_1 = require("../../application/users.usecase");
let UsersController = class UsersController {
    constructor(_usersUsecase) {
        this._usersUsecase = _usersUsecase;
    }
    async getAllUsers() {
        return this._usersUsecase.handleGetAllUsers();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_usecase_1.default])
], UsersController);
//# sourceMappingURL=users.controller.js.map