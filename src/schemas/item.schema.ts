import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  product: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  ingredients: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
