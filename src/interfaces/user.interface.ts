import { AddressInterface } from './address.interface';
import { OrderInterface } from './order.interface';
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  address: AddressInterface[];
  orders: OrderInterface[];
}
