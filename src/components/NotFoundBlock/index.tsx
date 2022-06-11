import React from 'react';

import styles from './notFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div>
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          Ничего не найдено
        </h1>
        <p className={styles.description}>
          К сожалени данная страница отсутствует в нашем интернет-магазине
        </p>
      </div>
    </div>
  );
};

export default NotFoundBlock;
