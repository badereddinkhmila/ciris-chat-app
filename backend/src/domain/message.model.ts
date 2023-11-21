export default class Message {
  id?: string;

  readonly message: string;

  createdAt?: Date | undefined;

  deletedAt?: Date | undefined;

  chatroomId: string;

  createdBy: string;
  constructor(message: string, chatroomId: string, createdBy: string) {
    this.message = message;
    this.chatroomId = chatroomId;
    this.createdBy = createdBy;
  }
}
