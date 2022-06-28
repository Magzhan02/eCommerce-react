import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, Sort, SortPropertyEnum } from './types';

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
