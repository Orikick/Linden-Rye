import { useState } from "react";
import { getMapLinks, restaurant } from "../../../data/restaurant.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import Spinner from "../../ui/Spinner/Spinner.jsx";
import StatusMessage from "../../ui/StatusMessage/StatusMessage.jsx";
import styles from "./MapEmbed.module.scss";

// Embedded OpenStreetMap view of the restaurant. The frame loads lazily, shows
// a loading state until it arrives, and falls back to plain links when the
// browser is offline. The links are always present below the map.
export default function MapEmbed() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const links = getMapLinks();
  const { address } = restaurant;
  const place = `${restaurant.name}, ${address.street}, ${address.postalCode} ${address.city}`;
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;

  return (
    <div>
      {offline ? (
        <StatusMessage tone="error" title={t("contacts.offlineTitle")} as="h3">
          <p>{t("contacts.offlineBody", { address: `${address.street}, ${address.postalCode} ${address.city}` })}</p>
        </StatusMessage>
      ) : (
        <div className={styles.frame}>
          {!loaded && (
            <div className={styles.loading}>
              <Spinner label={t("contacts.loadingMap")} />
            </div>
          )}
          <iframe
            className={styles.iframe}
            title={t("contacts.mapFrame", { place })}
            src={links.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      <ul className={styles.links}>
        <li>
          <a href={links.directions} target="_blank" rel="noopener noreferrer">
            {t("contacts.googleDirections")}
            <span className="visually-hidden">{t("common.newTab")}</span>
          </a>
        </li>
        <li>
          <a href={links.view} target="_blank" rel="noopener noreferrer">
            {t("contacts.openOsm")}
            <span className="visually-hidden">{t("common.newTab")}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
