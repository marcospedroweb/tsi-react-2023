import React from 'react';
import styles from './FetchPokemon.module.css';
import Pokedex from './Pokedex';

const FetchPokemon = () => {
  const [pokemons, setPokemons] = React.useState([]);

  async function fetchPokemons(url) {
    const promisse = await fetch(url || 'https://pokeapi.co/api/v2/pokemon');
    const json = await promisse.json();
    setPokemons(json);
  }

  React.useEffect(() => {
    fetchPokemons();
  }, []);

  if (!pokemons) return <h1>Carregando...</h1>;
  else if (pokemons && pokemons.results)
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Quantidade de pokemons: {pokemons.count}</h1>
        <Pokedex
          poke={pokemons.results}
          urlPokemon={pokemons.results[0].url}
          number={1}
        />
      </div>
    );
};

export default FetchPokemon;
