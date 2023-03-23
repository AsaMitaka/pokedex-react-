import { useState, useEffect } from 'react';
import useServices from '../../utils/services';
import styles from './items.module.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function Items() {
  const { pageId } = useParams();
  const parsedPageId = parseInt(pageId);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(isNaN(parsedPageId) ? 1 : parsedPageId);
  const [end, setEnd] = useState(false);

  const { loading, error, getAllItems } = useServices();
  const navigate = useNavigate();

  const prevPage = () => {
    if (pages === 1) return;

    navigate(`/items/${pages - 1}`);
  };

  const nextPage = () => {
    if (end) return;

    navigate(`/items/${pages + 1}`);
  };

  const updateItems = (newPoke) => {
    if (newPoke.length < 20) {
      setEnd(true);
    }

    setItems([...newPoke]);
  };

  const getPokemons = (pages) => {
    getAllItems((pages - 1) * 20).then(updateItems);
  };

  useEffect(() => {
    if (pageId) {
      setPages(parseInt(pageId));
    }

    getPokemons(pages);
  }, [pages, pageId]);

  const isLoading = loading ? 'loading' : '';
  const isError = error ? 'error' : '';
  const item = !isLoading
    ? items.map((item, index) => <ItemsView key={`${index}__${item.name}`} item={item} />)
    : '';

  return (
    <section className={styles.items}>
      <h1>Items</h1>
      <div className={styles.itemsBlock}>
        {isLoading}
        {isError}
        {item}
      </div>
      <div className={styles.itemBtns}>
        <button disabled={pages === 1} onClick={prevPage} className={styles.itemBtn}>
          prev
        </button>
        <button disabled={end} onClick={nextPage} className={styles.itemBtn}>
          next
        </button>
      </div>
    </section>
  );
}

const ItemsView = ({ item: { attributes, category, cost, id, imageUrl, name } }) => {
  const itemName = name.replace('-', ' ');
  const itemNamez = itemName[0].toUpperCase() + itemName.slice(1);
  const ctg = category.replace('-', ' ');

  return (
    <div className={styles.item}>
      <p className={styles.itemHeader}>
        {itemNamez} {id}
      </p>
      <img src={imageUrl} alt={name} className={styles.itemImg} />
      <p className={styles.itemCtg}>Category: {ctg}</p>
      <p className={styles.itemCost}>Cost: {cost}</p>
      {attributes.length > 0 && (
        <>
          <p className={styles.itemAttr}>Attributes: </p>
          <ul className={styles.itemList}>
            {attributes.map((item, index) => (
              <li key={`${index}__${item.name}`} className={styles.itemListLi}>
                {item.name.replace(/-/g, ' ')}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
