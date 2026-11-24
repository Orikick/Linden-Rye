import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import { formatPrice } from "../../../utils/format.js";
import Picture from "../../ui/Picture/Picture.jsx";
import Tag from "../../ui/Tag/Tag.jsx";
import styles from "./MenuItem.module.scss";

// One dish, set like a line on a printed menu: name, dotted leader, price.
// Dishes with a photo show it as a framed square beside the text.
export default function MenuItem({ item }) {
  const { t, pick, locale } = useLanguage();
  const { name, description, price, tags = [], photo } = item;

  return (
    <li className={cx(styles.item, photo && styles.withPhoto)}>
      {photo && (
        <div className={styles.thumb}>
          <Picture photo={photo} ratio={1} widths={[120, 200]} sizes="(min-width: 768px) 100px, 80px" />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{pick(name)}</h3>
          <span className={styles.leader} aria-hidden="true" />
          <p className={styles.price}>
            <span className="visually-hidden">{t("common.price")}</span>
            {formatPrice(price, locale)}
          </p>
        </div>
        <p className={styles.description}>{pick(description)}</p>
        {tags.length > 0 && (
          <ul className={styles.tags} aria-label={t("menu.dietary")}>
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{t(`dietary.${tag}`)}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
