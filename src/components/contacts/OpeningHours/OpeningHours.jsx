import { formatPeriods, getTodayHours, openingHours } from "../../../data/restaurant.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import Icon from "../../decor/Icon/Icon.jsx";
import styles from "./OpeningHours.module.scss";

// Weekly opening hours as a table, with today's row marked in text and in style.
export default function OpeningHours({ headingId = "opening-hours-title" }) {
  const { t } = useLanguage();
  const today = getTodayHours();
  const days = t("days");

  if (openingHours.length === 0) {
    return <p>{t("contacts.hoursMissing")}</p>;
  }

  return (
    <div>
      <h2 id={headingId} className={styles.heading}>
        <Icon name="clock" size={28} className={styles.headingIcon} />
        {t("contacts.hoursTitle")}
      </h2>
      <table className={styles.table} aria-labelledby={headingId}>
        <thead className="visually-hidden">
          <tr>
            <th scope="col">{t("contacts.day")}</th>
            <th scope="col">{t("contacts.hoursCol")}</th>
          </tr>
        </thead>
        <tbody>
          {openingHours.map((entry) => {
            const isToday = entry.day === today.day;
            return (
              <tr key={entry.day} className={cx(styles.row, isToday && styles.today)}>
                <th scope="row" className={styles.day}>
                  {days[entry.day]}
                  {isToday && <span className={styles.badge}>{t("contacts.today")}</span>}
                </th>
                <td className={styles.hours}>{formatPeriods(entry.periods) ?? t("hours.closed")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={styles.note}>{t("contacts.hoursNote")}</p>
    </div>
  );
}
