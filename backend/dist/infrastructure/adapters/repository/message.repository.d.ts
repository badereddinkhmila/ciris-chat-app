import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import { MessageRepository } from '../../../domain/ports/message.repository';
import Message from 'src/domain/message.model';
export default class MessageRepositoryPostgres implements MessageRepository {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    getMessagesByChatroom(chatroomId: string, lastFetchedDate: string): Promise<Optional<Message[]>>;
    getMessagesByID(id: string): Promise<Optional<Message>>;
    createMessage(message: Message): Promise<Optional<Message>>;
    softDeleteMessage(messageId: string): Promise<Message>;
}
