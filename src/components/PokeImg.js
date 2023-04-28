import React from 'react';
import styles from './PokeImg.module.css';

const PokeImg = ({ img, name, background }) => {
  return (
    <div className={styles.screen} style={{ backgroundColor: background }}>
      <img src={img} alt={name} />
    </div>
  );
};

export default PokeImg;
