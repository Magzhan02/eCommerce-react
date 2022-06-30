import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItemsType, CartState } from './types';

const initialState: CartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const calcTotalPrice = (items: CartItemsType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const calcTotalCount = (items: CartItemsType[]) => {
  return items.reduce((sum: number, item: any) => sum + item.count, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItemsType>) {
      const newCartItem = state.items.find((obj) => obj.id === action.payload.id);

      if (newCartItem) {
        newCartItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
      state.totalCount = calcTotalCount(state.items);
    },
    removeCartItems(state, action: PayloadAction<string>) {
      const removeCart = state.items.find((obj) => obj.id === action.payload);

      if (removeCart) {
        removeCart.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
      state.totalCount = calcTotalCount(state.items);
    },

    deleteCartItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);
      state.totalCount = calcTotalCount(state.items);
    },

    deleteAllCartItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});
export const { setCartItems, removeCartItems, deleteCartItems, deleteAllCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
