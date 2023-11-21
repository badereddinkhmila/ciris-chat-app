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
const chatroom_model_1 = require("../../../domain/chatroom.model");
let ChatroomRepositoryPostgres = class ChatroomRepositoryPostgres {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    async createChatroom(_chatroom) {
        const chatroom = await this._prismaService.chatroom.create({
            data: {
                users: {
                    connect: [_chatroom.users[0], _chatroom.users[1]],
                },
            },
            include: {
                users: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        return typescript_optional_1.Optional.of(new chatroom_model_1.default(chatroom.id, chatroom.users));
    }
    async getByID(id) {
        const chatroom = await this._prismaService.chatroom.findUnique({
            where: {
                id: id,
            },
            include: {
                users: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        return new chatroom_model_1.default(chatroom.id, chatroom.users);
    }
};
ChatroomRepositoryPostgres = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatroomRepositoryPostgres);
exports.default = ChatroomRepositoryPostgres;
//# sourceMappingURL=chatroom.repository.js.map