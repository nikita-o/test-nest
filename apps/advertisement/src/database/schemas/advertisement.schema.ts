import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type AdvertisementDocument = Advertisement & Document;

@Schema()
export class Advertisement {
  @Prop({ required: true })
  shortTitle: string;
  @Prop()
  description: string;
  @Prop([String])
  images: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: User;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
  @Prop([String])
  tags: string[];
  @Prop({ required: true })
  isDeleted: boolean;
}

export const advertisementSchema = SchemaFactory.createForClass(Advertisement);
