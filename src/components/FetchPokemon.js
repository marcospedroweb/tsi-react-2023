import React from 'react';
import Card from './Card';
import styles from './FetchPokemon.module.css';

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

  // fetchPokemons();

  if (!pokemons) return <h1>Carregando...</h1>;
  else if (pokemons && pokemons.results)
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Quantidade de pokemons: {pokemons.count}</h1>
        <div className={styles.divPokemons}>
          {pokemons.results.map(({ name, url }, index) => {
            return <Card url={url} key={name} />;
          })}
        </div>
        <div>
          {pokemons.previous != null ? (
            <button
              onClick={() => {
                fetchPokemons(pokemons.previous);
              }}
            >
              Voltar
            </button>
          ) : (
            <button disabled>Voltar</button>
          )}
          {pokemons.next != null ? (
            <button
              onClick={() => {
                fetchPokemons(pokemons.next);
              }}
            >
              Proximo
            </button>
          ) : (
            <button disabled>Proximo</button>
          )}
        </div>
      </div>
    );
};

export default FetchPokemon;
