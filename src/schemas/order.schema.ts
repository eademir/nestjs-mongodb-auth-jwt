import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Item } from './item.schema';
import { Company } from './company.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true, default: Date.now() })
  orderDate: Date;
  @Prop({ required: true, type: mongoose.Schema })
  orderItems: Item[];
  @Prop({
    required: true,
    type: mongoose.Schema,
  })
  company: Company;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
