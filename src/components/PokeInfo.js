import React from 'react';
import styles from './PokeInfo.module.css';

const PokeInfo = ({ title, info, background, color, size }) => {
  return (
    <div
      className={`${styles.infoScreen} ${
        color === '#ffff00' ? '' : styles.whiteBox
      } ${size === 'normal' ? '' : styles.bigText}`}
      style={{ backgroundColor: background }}
    >
      <h3 style={{ color: color }}>{title}</h3>
      <ul style={{ color: color }}>
        {info.map(({ title, info }) => {
          return (
            <li key={title}>
              {title} {info}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokeInfo;
