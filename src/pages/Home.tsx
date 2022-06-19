import React from 'react';
import axios from 'axios';

import { Card, Categories, Sort, Skeleton } from '../components';

const Home: React.FC = () => {
  const [pizzas, setPizzas] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchPizzas = async () => {
      setIsLoading(false);
      const { data } = await axios.get(
        `https://629e069a3dda090f3c11d3a1.mockapi.io/item?category=${
          categoryId > 0 ? categoryId : ''
        }`,
      );
      setPizzas(data);
      setIsLoading(true);
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId]);

  const onClickCategory = React.useCallback((id: number) => {
    setCategoryId(id);
  }, []);

  const items = pizzas.map((obj: any) => <Card key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? items : skeletons}</div>
    </div>
  );
};

export default Home;
