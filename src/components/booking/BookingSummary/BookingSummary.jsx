import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import { formatLongDate, fromIsoDate } from "../../../utils/format.js";
import styles from "./BookingSummary.module.scss";

// The details of a booking as a description list.
export default function BookingSummary({ booking }) {
  const { t, locale } = useLanguage();
  const rows = [
    ["reference", booking.reference],
    ["date", formatLongDate(fromIsoDate(booking.date), locale)],
    ["time", booking.time],
    ["guests", t("booking.guestsCount", { count: booking.guests })],
    ["name", booking.name],
    ["phone", booking.phone],
  ];
  if (booking.comment) rows.push(["note", booking.comment]);

  return (
    <dl className={styles.summary}>
      {rows.map(([term, detail]) => (
        <div key={term} className={styles.row}>
          <dt className={styles.term}>{t(`confirmation.terms.${term}`)}</dt>
          <dd className={styles.detail}>{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
