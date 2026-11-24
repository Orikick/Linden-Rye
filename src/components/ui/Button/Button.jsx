import { Link } from "react-router-dom";
import cx from "../../../utils/cx.js";
import styles from "./Button.module.scss";

// One look for every call to action. Renders a router link when given `to`,
// a plain link when given `href`, and a button otherwise.
// variant: "primary" (on light), "accent" (on dark) or "outline".
export default function Button({
  to,
  href,
  variant = "primary",
  size = "regular",
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    size === "small" && styles.small,
    fullWidth && styles.fullWidth,
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
