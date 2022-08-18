import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { SendChatDto } from './dto/sendChat.dto';
import { Message, MessageDocument } from 'src/schemas/message.schema';

@Injectable()
export class ChatService {
  private readonly logger: Logger = new Logger(ChatService.name);
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async find(users: User[]): Promise<Chat> {
    Logger.debug('find');
    return this.chatModel.findOne(users).exec();
  }

  async sendMessage(data: SendChatDto): Promise<Message> {
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
    Logger.debug('sendMessage');
    // TODO: send emit 'send-message'
    return message;
  }

  async getHistory(id: string): Promise<Message[]> {
    Logger.debug('getHistory');
    return this.chatModel.findById(id, 'messages');
  }
}
