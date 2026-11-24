import cx from "../../../utils/cx.js";
import styles from "./Container.module.scss";

// Centres content and applies the page gutters. `narrow` suits long-form text and forms.
export default function Container({ as: Tag = "div", narrow = false, className, children, ...rest }) {
  return (
    <Tag className={cx(styles.container, narrow && styles.narrow, className)} {...rest}>
      {children}
    </Tag>
  );
}
