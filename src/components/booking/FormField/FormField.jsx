import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import styles from "./FormField.module.scss";

export const errorId = (id) => `${id}-error`;
export const hintId = (id) => `${id}-hint`;

// Label, hint and error message for one text control. `children` is a function
// that receives the id and ARIA attributes to spread onto the input, so the
// label, hint and error are always wired to it correctly.
export default function FormField({ id, label, hint, error, optional = false, children }) {
  const { t } = useLanguage();
  const describedBy = cx(hint && hintId(id), error && errorId(id)) || undefined;

  return (
    <div className={cx(styles.field, error && styles.invalid)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}>{t("common.optional")}</span>}
      </label>
      {hint && (
        <p id={hintId(id)} className={styles.hint}>
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      <FieldError id={errorId(id)} message={error} />
    </div>
  );
}

// Inline error text. Rendered only when there is a message.
export function FieldError({ id, message }) {
  const { t } = useLanguage();
  if (!message) return null;
  return (
    <p id={id} className={styles.error}>
      <span className="visually-hidden">{t("common.errorPrefix")}</span>
      {message}
    </p>
  );
}
