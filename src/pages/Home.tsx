import React from 'react';
import axios from 'axios';

import { Card, Categories, Sort, Skeleton } from '../components';

const Home: React.FC = () => {
  const [pizzas, setPizzas] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPizzas = async () => {
      const { data } = await axios.get('https://629e069a3dda090f3c11d3a1.mockapi.io/item');
      setPizzas(data);
      setIsLoading(true);
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, []);

  const items = pizzas.map((obj: any) => <Card key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? items : skeletons}</div>
    </div>
  );
};

export default Home;
