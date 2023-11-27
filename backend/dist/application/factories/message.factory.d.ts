import Message from '../../domain/message.model';
import MessageCommand from '../commands/message.command';
export default class MessageFactory {
    createMessage(_messageCommand: MessageCommand): Message;
}
