import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './favoritePoke.module.css';
import { FavContext } from '../..';

export default function FavoritePoke() {
  const { favItem, setFavItem } = useContext(FavContext);
  const [type, setType] = useState(null);
  const types = [
    'fire',
    'water',
    'poison',
    'grass',
    'steel',
    'electric',
    'ground',
    'ghost',
    'bug',
    'fairy',
    'normal',
    'fighting',
    'psychic',
    'rock',
    'flying',
    'ice',
    'dark',
    'dragon',
  ];

  const deleteFromFav = (id) => {
    setFavItem((prev) => prev.filter((item) => item.id !== id));
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const filteredFav =
    type === null
      ? favItem
      : favItem.filter((item) => item.types.some((t) => t.type.name === types[type]));

  const setFav = (index) => {
    setType(index);
  };

  return (
    <section className={styles.favoritePoke}>
      <h1>Favorites Poke</h1>
      {favItem.length < 1 ? (
        <div className={styles.favoritePokeNone}>U don't have favs</div>
      ) : (
        <>
          <ul className={styles.favPokeTypes}>
            <li
              className={type === null ? styles.favPokeTypeActive : styles.favPokeType}
              onClick={() => setFav(null)}>
              all
            </li>
            {types.map((item, index) => (
              <li
                className={type === index ? styles.favPokeTypeActive : styles.favPokeType}
                onClick={() => setFav(index)}
                key={`${index}__${item}`}>
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.favPokes}>
            {filteredFav.map((item, index) => (
              <View key={`${item.name}_${index}`} item={item} deleteFromFav={deleteFromFav} />
            ))}
          </div>
        </>
      )}

      <button onClick={handleBack} className={styles.favoritePokeBack}>
        back
      </button>
    </section>
  );
}

const View = ({ item: { id, name, imageUrl }, deleteFromFav }) => {
  return (
    <div className={styles.favPoke}>
      <Link to={`/pokemon/${id}`} className={styles.favPokeHeader}>
        <h2>{name}</h2>
      </Link>
      <img src={imageUrl} alt={name} className={styles.favPokeImg} />
      <button onClick={() => deleteFromFav(id)} className={styles.favPokeBtn}>
        Delete
      </button>
    </div>
  );
};
