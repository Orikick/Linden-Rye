import { Link } from "react-router-dom";
import { bookingLink, navLinks } from "../../../data/navigation.js";
import { formatPeriods, getTodayHours, restaurant } from "../../../data/restaurant.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import Wave from "../../decor/Wave/Wave.jsx";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { t } = useLanguage();
  const today = getTodayHours();
  const { address, phone, email } = restaurant;

  return (
    <footer className={styles.footer}>
      <Wave tone="cobalt" />
      <div className={styles.inner}>
        <div>
          <p className={styles.name}>Linden &amp; Rye</p>
          <p className={styles.line}>{t("footer.tagline")}</p>
        </div>

        <div>
          <h2 className={styles.heading}>{t("footer.visit")}</h2>
          <address className={styles.address}>
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            <a href={phone.href}>{phone.display}</a>
            <br />
            <a href={`mailto:${email}`}>{email}</a>
          </address>
        </div>

        <div>
          <h2 className={styles.heading}>{t("footer.hours")}</h2>
          <p>
            {t("footer.today", { day: t("days")[today.day] })}{" "}
            <span className={styles.nowrap}>{formatPeriods(today.periods) ?? t("hours.closed")}</span>
          </p>
          <p>
            <Link to="/contacts">{t("footer.allHours")}</Link>
          </p>
        </div>

        <nav aria-label={t("nav.footer")}>
          <h2 className={styles.heading}>{t("footer.pages")}</h2>
          <ul className={styles.links}>
            {[...navLinks, bookingLink].map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{t(link.labelKey)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.legal}>
        <p>{t("footer.legal")}</p>
        <p className={styles.credit}>{t("footer.credit")}</p>
      </div>
    </footer>
  );
}
