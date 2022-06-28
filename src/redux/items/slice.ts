import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsType, ItemsState, Status } from './types';
import { fetchItems } from './asyncAction';

const initialState: ItemsState = {
  items: [],
  isLoading: Status.LOADING,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ItemsType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.isLoading = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCESS;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.items = [];
      state.isLoading = Status.ERROR;
    });
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
