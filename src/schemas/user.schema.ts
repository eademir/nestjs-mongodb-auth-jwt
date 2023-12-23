import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from './address.schema';
import { Order } from './order.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  gender: number;
  @Prop({
    required: true,
    type: mongoose.Schema,
  })
  address: Address[];
  @Prop({ type: mongoose.Schema })
  orders: Order[];
}
export const UserSchema = SchemaFactory.createForClass(User);
