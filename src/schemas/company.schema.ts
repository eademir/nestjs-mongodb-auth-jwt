import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from './address.schema';
import { Item } from './item.schema';

export type CompanyDocument = HydratedDocument<Company>;
@Schema()
export class Company {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: true,
    type: mongoose.Schema,
  })
  address: Address;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  logo: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true, type: mongoose.Schema })
  menu: Item[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
