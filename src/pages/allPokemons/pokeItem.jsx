import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import useServices from '../../utils/services';
import Skeleton from '../../components/skeleton/skeleton';
import { FavContext } from '../..';

import styles from './pokeItem.module.css';

export default function PokeItem() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(false);
  const [loadMorePoke, setLoadMorePoke] = useState(false);
  const [search, setSearch] = useState('');

  const { favItem, setFavItem } = useContext(FavContext);
  const { loading, error, getAllPokemon } = useServices();
  const observer = useRef();

  const addToFav = (obj) => {
    setFavItem((prev) => [...prev, obj]);
  };

  const deleteFromFav = (id) => {
    setFavItem((prev) => prev.filter((item) => item.id !== id));
  };

  const morePokemons = () => {
    setOffset((prev) => prev + 20);
  };

  const updatePokemons = (newPoke) => {
    if (newPoke.length < 20) {
      setEnd(true);
    }

    morePokemons();
    setPokemons((prevPoke) => [...prevPoke, ...newPoke]);
  };

  const getPokemons = () => {
    getAllPokemon(offset).then(updatePokemons);
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      getPokemons();
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    if (!loadMorePoke) return;
    if (search.length > 1) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (loading) return;
    if (end) return;

    observer.current.observe(document.getElementById('end-of-page'));

    return () => {
      observer.current.disconnect();
    };
  }, [pokemons, loadMorePoke, search]);

  const filteredItems = pokemons.filter((item) => {
    if (search.length < 1) return true;

    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  const isLoading = loading ? [...new Array(20)].map((_, index) => <Skeleton key={index} />) : null;
  const isError = error ? 'On error' : null;
  const item = filteredItems.map((item, index) => (
    <View
      key={`${index}__${item.name}`}
      item={item}
      addToFav={addToFav}
      deleteFromFav={deleteFromFav}
      favItem={favItem}
    />
  ));

  return (
    <main className={styles.main}>
      <div className={styles.mainHeader}>
        <h2>Pokemons</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.mainInput}
          placeholder="search poke by name"
        />
      </div>
      <div className={styles.mainPokemons}>
        {isLoading}
        {isError}
        {item}
      </div>
      {!loadMorePoke && item && (
        <button className={styles.mainBtn} onClick={() => setLoadMorePoke(true)}>
          more items
        </button>
      )}
      <div id="end-of-page"></div>
    </main>
  );
}

const View = ({ item: { name, imageUrl, types, id }, favItem, addToFav, deleteFromFav }) => {
  const pokeId = id > 100 ? `${id}` : id > 10 ? `0${id}` : `00${id}`;
  const isFav = favItem.some((fav) => fav.id === id);
  const namez = name.replace(/-/g, ' ');
  const pokeName = namez[0].toUpperCase() + namez.slice(1);

  return (
    <div className={styles.pokemon}>
      <Link to={`/pokemon/${id}`} className={styles.pokemonLink}>
        <div className={styles.pokemonHeaderBlock}>
          <p className={styles.pokemonHeader}>{pokeName}</p>
          <p>#{pokeId}</p>
        </div>
      </Link>
      <div className={styles.pokemonTypes}>
        {types.map((item, index) => (
          <p
            key={`${index}__${item.type.name}`}
            className={`${styles.pokemonType} ${styles[item.type.name]}`}>
            {item.type.name}
          </p>
        ))}
      </div>
      <img src={imageUrl} alt={name} className={styles.pokemonImg} />

      {isFav ? (
        <button className={styles.pokemonBtn} onClick={() => deleteFromFav(id)}>
          Un Fav
        </button>
      ) : (
        <button
          className={styles.pokemonBtn}
          onClick={() => addToFav({ name, imageUrl, types, id })}>
          To Fav
        </button>
      )}
    </div>
  );
};
