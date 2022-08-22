import { User } from '../../../database/schemas/user.schema';

export class SendChatDto {
  author: User;
  receiver: User;
  text: string;
}
