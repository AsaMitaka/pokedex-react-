import { Link } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerLinks}>
        Main
      </Link>

      <Link to="/favorite" className={styles.headerLinks}>
        Favorite Poke
      </Link>
    </header>
  );
}
