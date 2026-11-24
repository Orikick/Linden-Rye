import cx from "../../../utils/cx.js";
import styles from "./ChoiceChips.module.scss";

// A single-choice group drawn as a row of chips. Underneath it is a fieldset of
// radio buttons, so arrow keys, labels and form semantics all work natively.
// options: [{ value, label }]. `compact` makes the chips smaller and keeps them
// on one line that scrolls sideways on narrow screens.
export default function ChoiceChips({
  legend,
  hideLegend = false,
  name,
  options,
  value,
  onChange,
  id,
  invalid = false,
  describedBy,
  compact = false,
  className,
  children,
}) {
  return (
    <fieldset
      id={id}
      className={cx(styles.group, className)}
      aria-describedby={describedBy}
      tabIndex={id ? -1 : undefined}
    >
      <legend className={hideLegend ? "visually-hidden" : styles.legend}>{legend}</legend>
      {options.length > 0 && (
        <div className={cx(styles.options, compact && styles.compact)}>
          {options.map((option) => (
            <label key={option.value} className={styles.option}>
              <input
                className={styles.input}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                aria-invalid={invalid || undefined}
              />
              <span className={styles.chip}>{option.label}</span>
            </label>
          ))}
        </div>
      )}
      {children}
    </fieldset>
  );
}
