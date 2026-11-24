import { NavLink } from "react-router-dom";
import { bookingLink, navLinks } from "../../../data/navigation.js";
import { restaurant } from "../../../data/restaurant.js";
import cx from "../../../utils/cx.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import Button from "../../ui/Button/Button.jsx";
import styles from "./MobileNav.module.scss";

// Navigation panel for small screens. It opens below the header bar, and closes
// on Escape, on navigation, or when keyboard focus moves out of the header.
export default function MobileNav({ id, open, onClose }) {
  const { t } = useLanguage();

  const handleBlur = (event) => {
    const next = event.relatedTarget;
    if (next && !event.currentTarget.parentElement.contains(next)) onClose();
  };

  return (
    <nav
      id={id}
      className={cx(styles.panel, open && styles.open)}
      aria-label={t("nav.main")}
      hidden={!open}
      onBlur={handleBlur}
    >
      <ul className={styles.links}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => cx(styles.link, isActive && styles.active)}
            onClick={() => onClose()}
          >
            {t("nav.home")}
          </NavLink>
        </li>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => cx(styles.link, isActive && styles.active)}
              onClick={() => onClose()}
            >
              {t(link.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Button to={bookingLink.to} fullWidth onClick={() => onClose()}>
          {t(bookingLink.labelKey)}
        </Button>
        <a className={styles.phone} href={restaurant.phone.href}>
          {t("nav.call", { phone: restaurant.phone.display })}
        </a>
      </div>
    </nav>
  );
}
