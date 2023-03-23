import { useEffect, useState } from 'react';
import useServices from '../../utils/services';
import Skeleton from '../../components/skeleton/skeleton';
import styles from './berriespage.module.css';

export default function BerriesPage() {
  const { loading, getAllBerries, error, clearError } = useServices();
  const [berries, setBerries] = useState([]);
  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(false);

  const updateBerries = (newBerries) => {
    if (newBerries.length < 20) {
      setEnd(true);
    }

    moreBerries();
    setBerries((prevBerries) => [...prevBerries, ...newBerries]);
  };

  const moreBerries = () => {
    setOffset((prev) => prev + 20);
  };

  const getBerries = () => {
    getAllBerries(offset).then(updateBerries);
  };

  useEffect(() => {
    getBerries();
  }, []);

  const isLoading = loading ? [...new Array(20)].map((_, index) => <Skeleton key={index} />) : null;
  const isError = error ? 'On error' : null;
  const item = berries.map((item, index) => (
    <BerryView key={`${index}__${item.name}`} item={item} />
  ));

  return (
    <section className={styles.berries}>
      <h1>Berries</h1>
      <div className={styles.berriesMain}>
        {isLoading}
        {isError}
        {item}
      </div>
      {item && !end && (
        <button className={styles.berriesBtn} onClick={() => getBerries()}>
          Load More
        </button>
      )}
    </section>
  );
}

const BerryView = ({
  item: { name, imageUrl, size, smoothness, growth_time, natural_gift_power, soil_dryness },
}) => {
  const header = name[0].toUpperCase() + name.slice(1);

  return (
    <div className={styles.berriesItem}>
      <p className={styles.berriesItemHeader}>{header}</p>
      <img src={imageUrl} alt={name} className={styles.berriesItemImg} />
      <details>
        <summary>About Berry</summary>
        <p>Size: {size}</p>
        <p>Smoothness: {smoothness}</p>
        <p>Growth Time: {growth_time}</p>
        <p>Natural gift power: {natural_gift_power}</p>
        <p>Soil Dryness: {soil_dryness}</p>
      </details>
    </div>
  );
};
