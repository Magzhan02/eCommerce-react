import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ItemsFetchParams, ItemsType } from './types';

export const fetchItems = createAsyncThunk<ItemsType[], ItemsFetchParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, orderBy, category, currentPage } = params;
    const { data } = await axios.get<ItemsType[]>(
      `https://626d16545267c14d5677d9c2.mockapi.io/items`,
      {
        params: {
          page: currentPage,
          limit: 8,
          category,
          sortBy,
          orderBy,
        },
      },
    );

    return data;
  },
);
