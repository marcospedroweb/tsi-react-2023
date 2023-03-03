/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './Pokedex.module.css';
import PokeImg from './PokeImg';
import PokeInfo from './PokeInfo';

const Pokedex = ({ poke, urlPokemon, number, pokeCount }) => {
  const [pokemon, setPokemon] = React.useState('');
  const [num, setNum] = React.useState(number);
  const [screenBackground, setScreenBackground] = React.useState('');
  const [screenInfoColor, setScreenInfoColor] = React.useState('');
  const [infoPoke, setInfoPoke] = React.useState('');
  const [imgPoke, setImgPoke] = React.useState('');
  const [textSize, setTextSize] = React.useState('');

  async function fetchPokemon(url, step) {
    if (url && step === 'next') {
      setNum(num + 1);
      url = url + (num + 1);
    } else if (url && step === 'previous') {
      setNum(num - 1);
      url = url + (num - 1);
    } else if (url && step === 'last') {
      setNum(10271);
      url = url + 10271;
    } else if (url && step === 'first') {
      setNum(1);
      url = url + 1;
    }

    const promisse = await fetch(url || urlPokemon);
    const json = await promisse.json();
    setPokemon(json);
    setScreenBackground('#323232');
    setScreenInfoColor({
      background: '#323232',
      color: '#ffff00',
    });
    setTextSize('normal');
    setImgPoke(json.sprites.other.dream_world.front_default);
    setInfoPoke({
      title: 'Informações Básicas',
      info: [
        {
          title: 'Nome: ',
          info: json.name,
        },
        {
          title: 'Experiência base: ',
          info: json.base_experience,
        },
        {
          title: 'Altura: ',
          info: json.height,
        },
        {
          title: 'Peso: ',
          info: json.weight,
        },
      ],
    });
  }

  React.useEffect(() => {
    fetchPokemon();
  }, []);

  if (!pokemon)
    return (
      <div className={styles.divPokedex}>
        <div className={styles.divBip}>
          <div className={styles.bip}></div>
          <div className={styles.divName}>
            <span>Carregando...</span>
          </div>
        </div>
        <div className={styles.screen}>
          <img
            src="https://media.tenor.com/wfEN4Vd_GYsAAAAC/loading.gif"
            alt="Carregando"
          />
        </div>
        <div className={styles.divButtons}>
          <div>
            <span className={styles.btnMore}></span>
          </div>
          <div className={styles.divArrows}>
            <div className={`${styles.divArrow} ${styles.disabled}`}>
              <span
                className={`${styles.arrow} ${styles.arrowLeft} `}
                onClick={() => {}}
              ></span>
            </div>
            <div className={`${styles.divArrow} ${styles.disabled}`}>
              <span className={`${styles.arrow} ${styles.arrowRight}`}></span>
            </div>
          </div>
        </div>
      </div>
    );
  else if (pokemon && infoPoke)
    return (
      <div className={styles.divPokedexOpened}>
        <div className={styles.divPokedex}>
          <div>
            <div className={styles.divBip}>
              <div className={styles.bip}></div>
            </div>
            <PokeImg
              img={imgPoke}
              name={pokemon.name}
              background={screenBackground}
            />
            <div className={styles.divButtons}>
              <div>
                <span
                  className={styles.btnMore}
                  onClick={() => {
                    if (
                      imgPoke ===
                      pokemon.sprites.other.dream_world.front_default
                    ) {
                      setImgPoke(pokemon.sprites.front_default);
                    } else if (imgPoke === pokemon.sprites.front_default) {
                      setImgPoke(pokemon.sprites.back_default);
                    } else if (imgPoke === pokemon.sprites.back_default) {
                      setImgPoke(
                        pokemon.sprites.other.dream_world.front_default,
                      );
                    }
                  }}
                ></span>
              </div>
              <div className={styles.divName}>
                <h2>{pokemon.name}</h2>
              </div>
              <div className={styles.divArrows}>
                <div
                  className={`${styles.divArrow} ${
                    num === 1 ? styles.disabled : ''
                  }`}
                >
                  <span
                    className={`${styles.arrow} ${styles.arrowLeft} `}
                    onClick={
                      num !== 1
                        ? () => {
                            fetchPokemon(
                              `https://pokeapi.co/api/v2/pokemon/`,
                              'previous',
                            );
                          }
                        : () => {}
                    }
                  ></span>
                </div>
                <div
                  className={`${styles.divArrow} ${
                    num === 10271 ? styles.disabled : ''
                  }`}
                  onClick={() => {
                    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/`, 'next');
                  }}
                >
                  <span
                    className={`${styles.arrow} ${styles.arrowRight}`}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pokeInfo}>
          <PokeInfo
            title={infoPoke.title}
            info={infoPoke.info}
            background={screenInfoColor.background}
            color={screenInfoColor.color}
            size={textSize}
          />
          <div className={styles.divBtnsInfo}>
            <div className={styles.divFlexBtns}>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  setInfoPoke({
                    title: 'Informações Básicas',
                    info: [
                      {
                        title: 'Nome: ',
                        info: pokemon.name,
                      },
                      {
                        title: 'Experiência base: ',
                        info: pokemon.base_experience,
                      },
                      {
                        title: 'Altura: ',
                        info: pokemon.height,
                      },
                      {
                        title: 'Peso: ',
                        info: pokemon.weight,
                      },
                    ],
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  const abilities = [];
                  pokemon.abilities.forEach(({ ability, slot }, index) => {
                    abilities.push({
                      title: `Habilidade ${index + 1}: `,
                      info: `${ability.name} (slot: ${slot})`,
                    });
                  });
                  setInfoPoke({
                    title: 'Habilidades',
                    info: abilities,
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  const moves = [];
                  pokemon.moves.forEach(({ move }, index) => {
                    moves.push({
                      title: `Movimento ${index + 1}: `,
                      info: `${move.name}`,
                    });
                  });
                  setInfoPoke({
                    title: 'Movimentos',
                    info: moves,
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  const types = [];
                  pokemon.types.forEach(({ type }, index) => {
                    types.push({
                      title: `Tipo ${index + 1}: `,
                      info: `${type.name}`,
                    });
                  });
                  setInfoPoke({
                    title: 'Tipos',
                    info: types,
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  const stats = [];
                  pokemon.stats.forEach(({ stat, base_stat }, index) => {
                    stats.push({
                      title: `${stat.name}: `,
                      info: `${base_stat}`,
                    });
                  });
                  setInfoPoke({
                    title: 'Estatísticas',
                    info: stats,
                  });
                }}
              ></span>
            </div>
            <div className={styles.divFlexBtns}>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  setScreenInfoColor({
                    background: '#323232',
                    color: '#ffff00',
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  setScreenInfoColor({
                    background: '#fff',
                    color: '#323232',
                  });
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  setTextSize('normal');
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  setTextSize('big');
                }}
              ></span>
              <span
                className={styles.infoBtn}
                onClick={() => {
                  window.open(
                    'https://www.youtube.com/watch?v=UzyY75igQ9s&ab_channel=GamesOST2000',
                  );
                }}
              ></span>
            </div>
          </div>
          <div className={styles.divDecoration}>
            <div>
              <div
                className={styles.divBoxWhite}
                onClick={() => {
                  setScreenBackground('#323232');
                }}
              ></div>
              <div
                className={styles.divBoxWhite}
                onClick={() => {
                  setScreenBackground('#fff');
                }}
              ></div>
            </div>
            <div>
              <div className={styles.decorationSphere}></div>
            </div>
          </div>
          <div className={styles.divDecoration}>
            <div
              className={styles.divBoxBlack}
              onClick={() => {
                fetchPokemon(`https://pokeapi.co/api/v2/pokemon/`, 'first');
              }}
            ></div>
            <div
              className={styles.divBoxBlack}
              onClick={() => {
                fetchPokemon(`https://pokeapi.co/api/v2/pokemon/`, 'last');
              }}
            ></div>
          </div>
        </div>
      </div>
    );
};

export default Pokedex;
