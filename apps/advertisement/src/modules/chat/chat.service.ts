import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'apps/advertisement/src/database/schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/advertisement/src/database/schemas/user.schema';
import { SendChatDto } from './dto/sendChat.dto';
import { Message, MessageDocument } from 'apps/advertisement/src/database/schemas/message.schema';
import * as EventEmitter from 'events';

@Injectable()
export class ChatService {
  private readonly logger: Logger = new Logger(ChatService.name);
  private sendMessageEvent: EventEmitter = new EventEmitter();

  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async find(users: User[]): Promise<Chat> {
    this.logger.debug('find');
    return this.chatModel.findOne(users).exec();
  }

  async sendMessage(data: SendChatDto): Promise<Message> {
    this.logger.debug('sendMessage');
    const { author, receiver, text } = data;
    const message: MessageDocument = new this.messageModel({
      author,
      text,
    });
    let chat: ChatDocument = await this.chatModel.findOne({
      users: [author, receiver],
    });
    if (!chat) {
      chat = new this.chatModel({
        users: [author, receiver],
      });
    }
    chat.messages.push(message);
    await chat.save();
    this.sendMessageEvent.emit('send-message', {
      chatId: chat.id,
      message,
    });
    return message;
  }

  async getHistory(id: string): Promise<Message[]> {
    this.logger.debug('getHistory');
    return this.chatModel.findById(id, 'messages');
  }

  subscribe(cb: any): void {
    this.sendMessageEvent.on('send-message', (args) => {
      cb(args);
    });
  }
}
