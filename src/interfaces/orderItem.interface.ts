export interface OrderItemInterface {
  id: string;
  image: string;
  product: string;
  price: number;
  ingredients: string[] | null;
}
