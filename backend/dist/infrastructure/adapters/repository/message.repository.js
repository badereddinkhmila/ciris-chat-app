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
let MessageRepositoryPostgres = class MessageRepositoryPostgres {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    async getMessagesByChatroom(chatroomId, lastFetchedDate) {
        return typescript_optional_1.Optional.of(await this._prismaService.message.findMany({
            where: {
                chatroomId: chatroomId,
                createdAt: {
                    lt: lastFetchedDate,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
            take: 30,
        }));
    }
    async getMessagesByID(id) {
        return typescript_optional_1.Optional.of(await this._prismaService.message.findUnique({
            where: {
                id: id,
            },
        }));
    }
    async createMessage(message) {
        return typescript_optional_1.Optional.of(await this._prismaService.message.create({
            data: {
                message: message.message,
                chatroom: {
                    connect: {
                        id: message.chatroomId,
                    },
                },
                createdBy: message.createdBy,
            },
            include: {
                chatroom: true,
            },
        }));
    }
    async softDeleteMessage(messageId) {
        return this._prismaService.message.update({
            where: {
                id: messageId,
            },
            data: {
                deletedAt: new Date(Date.now()),
            },
        });
    }
};
MessageRepositoryPostgres = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessageRepositoryPostgres);
exports.default = MessageRepositoryPostgres;
//# sourceMappingURL=message.repository.js.map