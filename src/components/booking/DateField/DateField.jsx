import { DayPicker } from "react-day-picker";
import { enGB, uk } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { bookingRules } from "../../../data/timeSlots.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import { addDays, formatLongDate, startOfToday } from "../../../utils/format.js";
import { errorId, FieldError } from "../FormField/FormField.jsx";
import styles from "./DateField.module.scss";

// Calendar locales, which also translate the calendar's own button labels.
const calendarLocales = { en: enGB, uk };

// Calendar for choosing the booking date. Past dates, closed days and dates
// beyond the booking window cannot be selected.
export default function DateField({ id, value, onChange, error }) {
  const { t, lang, locale } = useLanguage();
  const today = startOfToday();
  const lastDay = addDays(today, bookingRules.windowDays);
  const statusId = `${id}-selected`;

  return (
    <fieldset
      id={id}
      tabIndex={-1}
      className={cx(styles.field, error && styles.invalid)}
      aria-describedby={cx(statusId, error && errorId(id))}
    >
      <legend className={styles.legend}>{t("booking.date")}</legend>
      <p className={styles.hint}>{t("booking.dateHint", { days: bookingRules.windowDays })}</p>

      <div className={styles.calendar}>
        <DayPicker
          mode="single"
          locale={calendarLocales[lang]}
          selected={value}
          onSelect={onChange}
          disabled={[{ before: today }, { after: lastDay }, { dayOfWeek: bookingRules.closedWeekdays }]}
          startMonth={today}
          endMonth={lastDay}
          defaultMonth={value ?? today}
          weekStartsOn={1}
        />
      </div>

      <p id={statusId} className={styles.selected} aria-live="polite">
        {value ? t("booking.selected", { date: formatLongDate(value, locale) }) : t("booking.noDate")}
      </p>
      <FieldError id={errorId(id)} message={error} />
    </fieldset>
  );
}
