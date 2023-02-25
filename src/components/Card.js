import React from 'react';
import styles from './Card.module.css';

const Card = ({ url }) => {
  const [data, setData] = React.useState({});
  async function getData(urlPokemon) {
    const promisse = await fetch(urlPokemon);
    const json = await promisse.json();
    setData(json);
  }

  getData(url);

  if (data && data.name)
    return (
      <div className={styles.divPokemon}>
        <img
          src={data.sprites.other.dream_world.front_default}
          className={styles.img}
          alt=""
        />
        <h2 className={styles.name}>{data.name}</h2>
      </div>
    );
};

export default Card;
