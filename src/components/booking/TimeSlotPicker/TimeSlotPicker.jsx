import { restaurant } from "../../../data/restaurant.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import ChoiceChips from "../../ui/ChoiceChips/ChoiceChips.jsx";
import { errorId, FieldError } from "../FormField/FormField.jsx";
import styles from "./TimeSlotPicker.module.scss";

// Time choices for the selected date. Shows guidance when no date is chosen
// yet, and when the chosen day has no tables left.
export default function TimeSlotPicker({ id, slots, hasDate, value, onChange, error }) {
  const { t } = useLanguage();
  const options = slots.map((slot) => ({ value: slot, label: slot }));

  return (
    <ChoiceChips
      id={id}
      legend={t("booking.time")}
      name="time"
      options={options}
      value={value}
      onChange={onChange}
      invalid={Boolean(error)}
      describedBy={error ? errorId(id) : undefined}
    >
      {!hasDate && <p className={styles.empty}>{t("booking.chooseDate")}</p>}
      {hasDate && slots.length === 0 && (
        <p className={styles.empty}>
          {t("booking.noSlots")} <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
        </p>
      )}
      <div className={styles.error}>
        <FieldError id={errorId(id)} message={error} />
      </div>
    </ChoiceChips>
  );
}
