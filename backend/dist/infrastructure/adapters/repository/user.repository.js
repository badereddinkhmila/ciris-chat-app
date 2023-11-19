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
const common_1 = require("@nestjs/common");
const typescript_optional_1 = require("typescript-optional");
const prisma_service_1 = require("../../prisma.service");
let UserRepositoryPostgres = class UserRepositoryPostgres {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    async getAllUsers() {
        return this._prismaService.user.findMany();
    }
    async getByEmail(email) {
        return typescript_optional_1.Optional.ofNullable(await this._prismaService.user.findUnique({
            where: {
                email: email,
            },
        }));
    }
    async getByID(id) {
        return typescript_optional_1.Optional.of(await this._prismaService.user.findUnique({
            where: {
                id: id,
            },
        }));
    }
    async createUser(user) {
        return typescript_optional_1.Optional.of(await this._prismaService.user.create({
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            },
        }));
    }
};
UserRepositoryPostgres = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepositoryPostgres);
exports.default = UserRepositoryPostgres;
//# sourceMappingURL=user.repository.js.map