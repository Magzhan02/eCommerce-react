import { RootState } from '../store';

export const cartData = (state: RootState) => state.cart;

export const getCartItemsById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
