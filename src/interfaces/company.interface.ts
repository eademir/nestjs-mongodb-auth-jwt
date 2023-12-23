import { AddressInterface } from './address.interface';
import { OrderItemInterface } from './orderItem.interface';
import { CommentInterface } from './comment.interface';

export interface CompanyInterface {
  id: string;
  name: string;
  description: string;
  logo: string;
  address: AddressInterface;
  menu: OrderItemInterface[];
  type: string;
  rating: number;
  comments: CommentInterface[];
}
