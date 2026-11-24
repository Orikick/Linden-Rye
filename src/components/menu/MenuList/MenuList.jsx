import MenuItem from "../MenuItem/MenuItem.jsx";
import styles from "./MenuList.module.scss";

// The dishes of one category. The page decides what to show when the list is empty.
export default function MenuList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
