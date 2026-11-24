import cx from "../../../utils/cx.js";
import styles from "./Wave.module.scss";

// Wavy top edge for a coloured section. Put it as the first child of a section
// with position: relative; `tone` is the section's own colour token.
export default function Wave({ tone = "cobalt", className }) {
  return (
    <svg
      className={cx(styles.wave, className)}
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={`var(--${tone})`}
        d="M0 48V24C60 10 120 6 180 14s120 26 180 26 120-18 180-26 120-8 180 0 120 26 180 26 120-18 180-26 120-8 180 0 120 26 180 26 120-18 180-26V48z"
      />
    </svg>
  );
}
