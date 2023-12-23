import { OrderItemInterface } from './orderItem.interface';

export interface OrderInterface {
  id: string;
  company: string;
  orderDate: Date;
  orderTotal: number | null;
  orderItems: OrderItemInterface[];
}
