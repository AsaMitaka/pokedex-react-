import { useParams, useNavigate } from 'react-router-dom';
import useServices from '../../utils/services';
import { useEffect, useState } from 'react';
import styles from './pokemon.module.css';

export default function Pokemon() {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const { pokemonId } = useParams();
  const { loading, error, getPokemonById, clearError } = useServices();

  const getPokemon = () => {
    getPokemonById(pokemonId).then((res) => setPokemon(res));
  };

  const handleBack = () => navigate(-1);

  useEffect(() => {
    getPokemon();
  }, []);

  const isLoading = loading ? 'Is loading' : null;
  const isError = error ? 'Error' : null;
  const item = pokemon ? <PokemonView pokemon={pokemon} /> : '';

  return (
    <section className={styles.pokemon}>
      {isLoading}
      {isError}
      {item}
      <button onClick={handleBack} className={styles.pokemonBtn}>
        Go Back
      </button>
    </section>
  );
}

const PokemonView = ({
  pokemon: { name, weight, height, imageUrl, base_experience, types, abilities, stats, id },
}) => {
  const namez = name.replace(/-/g, ' ');
  const pokeName = namez[0].toUpperCase() + namez.slice(1);
  const pokeId = id > 100 ? `${id}` : id > 10 ? `0${id}` : `00${id}`;
  return (
    <div className={styles.pokemonBlock}>
      <div className={styles.pokemonBlocks}>
        <div className={styles.pokemonBlockLeft}>
          <p className={styles.pokemonHeader}>{pokeName}</p>
          <ul className={styles.pokemonTypeList}>
            {types.map((item, index) => (
              <li
                key={`${index}__${item.type.name}`}
                className={`${styles.pokemonTypeListLi}  ${styles[item.type.name]} `}>
                {item.type.name}
              </li>
            ))}
          </ul>
          <div className={styles.pokemonChart}>
            <div className={styles.pokemonCharts}>
              <p>Height</p>
              <p>{height}</p>
            </div>
            <div className={styles.pokemonCharts}>
              <p>Weight</p>
              <p>{weight}</p>
            </div>
          </div>
          <div className={styles.pokemonStats}>
            <p className={styles.pokemonStatsName}>Stats</p>
            {stats.map((item, index) => (
              <li className={styles.pokemonStatsLi} key={`${index}__${item.stat.name}`}>
                <p className={styles.pokemonStatsLiName}>
                  {item.stat.name[0].toUpperCase() + item.stat.name.slice(1)}
                </p>
                <p className={styles.pokemonStatsLiStat}>{item.base_stat}</p>
                <meter min="0" max="100" low="33" high="66" optimum="80" value={item.base_stat} />
              </li>
            ))}
          </div>

          <div className={styles.pokemonAbilities}>
            <p className={styles.pokemonAbilitiesName}>Abilities: </p>
            {abilities.map((item, index) => (
              <p
                key={`${index}__${item.ability.name}`}
                className={styles.pokemonAbility}>{`${item.ability.name}`}</p>
            ))}
          </div>
        </div>
        <div className={styles.pokemonBlockRight}>
          <p className={styles.pokemonBlockRightId}>#{pokeId}</p>
          <img src={imageUrl} alt={name} className={styles.pokemonImg} />
        </div>
      </div>
    </div>
  );
};

// Css Mobile
