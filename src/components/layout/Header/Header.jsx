import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { bookingLink, navLinks } from "../../../data/navigation.js";
import cx from "../../../utils/cx.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import Button from "../../ui/Button/Button.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import MobileNav from "../MobileNav/MobileNav.jsx";
import styles from "./Header.module.scss";

const MOBILE_NAV_ID = "mobile-navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const close = useCallback(({ restoreFocus = false } = {}) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Close the mobile panel after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") close({ restoreFocus: true });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logo}>
          Linden &amp; Rye
        </Link>

        <nav className={styles.desktopNav} aria-label={t("nav.main")}>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => cx(styles.link, isActive && styles.active)}
                >
                  {t(link.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to={bookingLink.to} size="small">
            {t(bookingLink.labelKey)}
          </Button>
        </nav>

        <LanguageSwitcher className={styles.language} />

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={MOBILE_NAV_ID}
          aria-label={open ? t("nav.close") : t("nav.open")}
          onClick={() => setOpen((value) => !value)}
        >
          <svg
            className={styles.toggleIcon}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 6.5h18M3 12h18M3 17.5h18" />
            )}
          </svg>
        </button>
      </div>

      <MobileNav id={MOBILE_NAV_ID} open={open} onClose={close} />
    </header>
  );
}
