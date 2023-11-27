import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import { ChatroomRepository } from '../../../domain/ports/chatroom.repository';
import Chatroom from '../../../domain/chatroom.model';
export default class ChatroomRepositoryPostgres implements ChatroomRepository {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    createChatroom(_chatroom: Chatroom): Promise<Optional<Chatroom>>;
    getByID(id: string): Promise<Chatroom>;
    getByUserID(_userId: string): Promise<Chatroom[]>;
}
