import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

//Search Context
type SearchContext = {
  searchValue: string;
  setSearchValue: (s: string) => void;
};
const MySearchContext = React.createContext<SearchContext>({
  searchValue: '', // set a default value
  setSearchValue: () => {},
});

export const SearchContext = () => React.useContext(MySearchContext);

const App = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  return (
    <MySearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </MySearchContext.Provider>
  );
};

export default App;
