import { Link } from 'react-router-dom';
import styles from './mainPage.module.css';

export default function MainPage() {
  return (
    <section className={styles.main}>
      <Link to="/pokemon" className={styles.mainLink}>
        <p className={styles.mainHeader}>Pokemon</p>
        <img src="./images/squirtle.png" alt="pokemon" className={styles.mainImg} />
      </Link>
      <Link to="/berry" className={styles.mainLink}>
        <p className={styles.mainHeader}>Berries</p>
        <img src="./images/berry.png" alt="berry" className={styles.mainImg} />
      </Link>
      <Link to="/items" className={styles.mainLink}>
        <p className={styles.mainHeader}>Items</p>
        <img src="./images/pokeball.png" alt="item" className={styles.mainImg} />
      </Link>
    </section>
  );
}
