import cx from "../../../utils/cx.js";
import styles from "./StatusMessage.module.scss";

// Shared block for empty and error states.
// tone "error" is announced immediately; tone "empty" is announced politely.
// Pass buttons or links as `action`.
export default function StatusMessage({
  tone = "empty",
  title,
  children,
  action,
  as: Heading = "h2",
  className,
}) {
  return (
    <div
      className={cx(styles.message, styles[tone], className)}
      role={tone === "error" ? "alert" : "status"}
    >
      <Heading className={styles.title}>{title}</Heading>
      {children && <div className={styles.body}>{children}</div>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
