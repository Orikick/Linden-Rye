import { restaurant } from "../../../data/restaurant.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import Icon from "../../decor/Icon/Icon.jsx";
import Button from "../../ui/Button/Button.jsx";
import styles from "./ContactDetails.module.scss";

// Address, click-to-call phone link and email.
export default function ContactDetails() {
  const { t } = useLanguage();
  const { address, phone, email } = restaurant;

  return (
    <div className={styles.details}>
      <div>
        <h2 className={styles.heading}>
          <Icon name="pin" size={28} className={styles.headingIcon} />
          {t("contacts.address")}
        </h2>
        <address className={styles.address}>
          {restaurant.name}
          <br />
          {address.street}
          <br />
          {address.postalCode} {address.city}
          <br />
          {t("contacts.country")}
        </address>
        <p className={styles.directions}>{t("contacts.directions")}</p>
      </div>

      <div>
        <h2 className={styles.heading}>
          <Icon name="phone" size={28} className={styles.headingIcon} />
          {t("contacts.phoneEmail")}
        </h2>
        <p className={styles.callHint}>{t("contacts.callHint")}</p>
        <Button href={phone.href} className={styles.call}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M6.6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 5.9 5.9l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z" />
          </svg>
          {t("nav.call", { phone: phone.display })}
        </Button>
        <p className={styles.email}>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </div>
  );
}
