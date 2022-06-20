import React from 'react';
import axios from 'axios';

import { Card, Categories, Sort, Skeleton, Pagination } from '../components';
import { SearchContext } from '../App';

const Home: React.FC = () => {
  const { searchValue } = SearchContext();
  const [pizzas, setPizzas] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchPizzas = async () => {
      setIsLoading(false);
      const { data } = await axios.get(
        `https://629e069a3dda090f3c11d3a1.mockapi.io/item?page=${currentPage}&limit=8&category=${
          categoryId > 0 ? categoryId : ''
        }`,
      );
      setPizzas(data);
      setIsLoading(true);
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, searchValue]);

  const onClickCategory = React.useCallback((id: number) => {
    setCategoryId(id);
    setCurrentPage(1);
  }, []);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const items = pizzas
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? items : skeletons}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
