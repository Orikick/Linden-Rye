import styles from "./Spinner.module.scss";

// Loading indicator. The label is always announced; pass showLabel={false} to hide it visually.
export default function Spinner({ label = "Loading", showLabel = true }) {
  return (
    <span className={styles.spinner} role="status">
      <span className={styles.ring} aria-hidden="true" />
      <span className={showLabel ? styles.label : "visually-hidden"}>{label}</span>
    </span>
  );
}
