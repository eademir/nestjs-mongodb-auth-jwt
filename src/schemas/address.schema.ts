import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location } from './location.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop()
  streetAddress: string;
  @Prop()
  city: string;
  @Prop()
  county: string;
  @Prop({ type: mongoose.Schema })
  location: Location;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
