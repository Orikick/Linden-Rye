import { useId } from "react";
import Icon from "../Icon/Icon.jsx";
import cx from "../../../utils/cx.js";
import styles from "./Stamp.module.scss";

// Round mustard badge with text running around a linden leaf.
// Decorative: the same facts are in the page text.
export default function Stamp({ text, className }) {
  const pathId = `stamp-${useId().replace(/:/g, "")}`;
  // Repeat the phrase so it wraps the whole circle.
  const ring = `${text} • ${text} • `;

  return (
    <div className={cx(styles.stamp, className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className={styles.ring}>
        <defs>
          <path id={pathId} d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
        </defs>
        <circle cx="60" cy="60" r="57" className={styles.disc} />
        <text className={styles.text}>
          <textPath href={`#${pathId}`} textLength="279" lengthAdjust="spacingAndGlyphs">
            {ring}
          </textPath>
        </text>
      </svg>
      <Icon name="leaf" size={34} className={styles.icon} strokeWidth={1.6} />
    </div>
  );
}
