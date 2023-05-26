import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingIcon}></div>
    </div>
  );
};

export default Loading;
