import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Logger } from '@nestjs/common';
import { SendChatDto } from './dto/sendChat.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  private readonly logger: Logger = new Logger(ChatGateway.name);
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.debug(`Client connected: ${client.id}`);
    this.logger.debug(`args: ${client.handshake.query.idAuthor}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server): void {
    this.logger.debug('Init webSocket');
  }

  @SubscribeMessage('getHistory')
  async getHistory(client: Socket, data: any): Promise<void> {
    this.logger.debug('getHistory');
    const chatHistory = 'test';
    // const users = {
    //   idAuthor: client.handshake.query.idAuthor,
    //   idReceiver: data.idCompanion,
    // };
    // const chat = await this.chatService.find(users);
    // const chatHistory = chat
    //   ? await this.chatService.getHistory(connectChat._id)
    //   : {
    //       data: 'Несуществующий чат',
    //       status: 'error',
    //     };
    this.server.emit('chat-history', chatHistory);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(client: Socket, data: any): Promise<void> {
    this.logger.debug('sendMessage');
    data.idAuthor = client.handshake.query.idAuthor;
    const message = await this.chatService.sendMessage(data);
    this.server.emit('new-message', message);
  }
}
