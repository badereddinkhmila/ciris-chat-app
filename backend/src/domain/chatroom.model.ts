import Message from './message.model';
export default class Chatroom {
  id?: string;

  users: string[];

  messages?: Message[] = [];

  constructor(id: string, users: string[]) {
    this.id = id;
    this.users = users;
  }
}
