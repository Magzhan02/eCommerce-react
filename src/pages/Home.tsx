import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';
import { selectedFilter } from '../redux/filter/selector';
import { itemsData } from '../redux/items/selector';

import { setCategoryId, setCurrentPage, setSort } from '../redux/filter/slice';
import { Sort as SortType } from '../redux/filter/types';
import { fetchItems } from '../redux/items/asyncAction';

import { Card, Categories, Sort, Skeleton, Pagination } from '../components';
import { SearchContext } from '../App';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = SearchContext();

  const { categoryId, currentPage, sort } = useSelector(selectedFilter);
  const { items, isLoading } = useSelector(itemsData);

  React.useEffect(() => {
    const fetchItemsData = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const orderBy = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? categoryId : '';

      dispatch(
        fetchItems({
          sortBy,
          orderBy,
          category: String(category),
          currentPage,
        }),
      );
    };
    fetchItemsData();
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, searchValue, sort]);

  const onClickCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
    onChangePage(1);
  }, []);

  const onChangeSort = (obj: SortType) => {
    dispatch(setSort(obj));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const data = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <Card key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} onClickCategory={onClickCategory} />
        <Sort onChangeSort={onChangeSort} value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === 'error' ? (
        <div className="content__error">
          <h2>Произошла ошибка</h2>
          <a href="/">Попробуйте повторить попытку позже.</a>
        </div>
      ) : (
        <>
          <div className="content__items">{isLoading === 'loading' ? skeletons : data}</div>
          <Pagination onChangePage={onChangePage} currentPage={currentPage} />
        </>
      )}
    </div>
  );
};

export default Home;
