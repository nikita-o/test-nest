import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  users: User[];
  @Prop({ required: true })
  createdAt: Date;
  @Prop()
  messages: string;
}

export const chatSchema = SchemaFactory.createForClass(Chat);
