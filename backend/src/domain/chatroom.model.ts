import Message from './message.model';
export default class Chatroom {
  id?: string;

  users: { id: string }[];

  messages?: Message[] = [];

  constructor(id: string, users: { id: string }[]) {
    this.id = id;
    this.users = users;
  }
}
