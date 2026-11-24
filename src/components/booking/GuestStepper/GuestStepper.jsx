import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import styles from "./GuestStepper.module.scss";

// Number of guests, changed with minus and plus buttons. The value can never
// leave the allowed range, and each change is announced to screen readers.
export default function GuestStepper({ id, value, onChange, min, max }) {
  const { t } = useLanguage();
  const labelId = `${id}-label`;

  return (
    <div id={id} role="group" aria-labelledby={labelId} tabIndex={-1}>
      <p id={labelId} className={styles.label}>
        {t("booking.guests")}
      </p>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={t("booking.removeGuest")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M5 12h14" />
          </svg>
        </button>
        <output className={styles.value} aria-live="polite">
          {t("booking.guestsCount", { count: value })}
        </output>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={t("booking.addGuest")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <p className={styles.hint}>{t("booking.guestsHint", { max })}</p>
    </div>
  );
}
