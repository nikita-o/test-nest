import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, chatSchema } from '../../database/schemas/chat.schema';
import { Message, messageSchema } from '../../database/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: messageSchema },
      { name: Chat.name, schema: chatSchema },
    ]),
  ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
