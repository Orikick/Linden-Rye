import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import styles from "./MenuSkeleton.module.scss";

// Placeholder shown while the menu loads. It has the same shape as the real
// list so the page does not jump when the dishes arrive.
export default function MenuSkeleton({ rows = 5 }) {
  const { t } = useLanguage();
  return (
    <div className={styles.skeleton} role="status" aria-busy="true">
      <span className="visually-hidden">{t("menu.loading")}</span>
      <div className={styles.tabs} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <ul className={styles.rows} aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <li key={index} className={styles.row}>
            <span className={styles.name} />
            <span className={styles.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}
