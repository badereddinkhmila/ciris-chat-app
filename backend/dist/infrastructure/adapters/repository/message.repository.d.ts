import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import { MessageRepository } from '../../../domain/ports/message.repository';
import Message from 'src/domain/message.model';
export default class MessageRepositoryPostgres implements MessageRepository {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    getMessagesByChatroom(chatroomId: string, lastFetchedDate: Date): Promise<Message[]>;
    createMessage(message: Message): Promise<Optional<Message>>;
    deleteMessage(messageId: string): Promise<boolean>;
}
