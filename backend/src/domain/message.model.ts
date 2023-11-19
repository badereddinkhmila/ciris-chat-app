export default class Message {
  id?: string;

  readonly message: string;

  readonly createdAt?: Date | null;

  readonly deletedAt?: Date | null;

  readonly chatroomId: string;

  readonly createdBy: string;
  constructor(message: string, chatroomId: string, createdBy: string) {
    this.message = message;
    this.chatroomId = chatroomId;
    this.createdBy = createdBy;
  }
}
