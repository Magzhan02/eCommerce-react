import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  id: number;
  onClickCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ id, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={id == i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
