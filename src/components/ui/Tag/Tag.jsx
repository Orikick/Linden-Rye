import styles from "./Tag.module.scss";

// Small text label, used for dietary information. Meaning is carried by the words, not by colour.
export default function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>;
}
