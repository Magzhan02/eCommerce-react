export type CartItemsType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface CartState {
  items: CartItemsType[];
  totalCount: number;
  totalPrice: number;
}
