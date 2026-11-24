import cx from "../../../utils/cx.js";
import styles from "./SectionHeading.module.scss";

// Heading for a section within a page, with optional supporting text.
export default function SectionHeading({ title, intro, id, as: Tag = "h2", className }) {
  return (
    <div className={cx(styles.heading, className)}>
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
