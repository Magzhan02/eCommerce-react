export type ItemsType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type ItemsFetchParams = {
  sortBy: string;
  orderBy: string;
  category: string;
  currentPage: number;
};

export interface ItemsState {
  items: ItemsType[];
  isLoading: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}
