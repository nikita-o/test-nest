import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  users: User[];
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  messages: Message[];
}

export const chatSchema = SchemaFactory.createForClass(Chat);
