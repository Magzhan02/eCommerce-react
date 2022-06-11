import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const [active, setActive] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} className={i == active ? 'active' : ''} onClick={() => setActive(i)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
