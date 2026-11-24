import ContactDetails from "../../components/contacts/ContactDetails/ContactDetails.jsx";
import MapEmbed from "../../components/contacts/MapEmbed/MapEmbed.jsx";
import OpeningHours from "../../components/contacts/OpeningHours/OpeningHours.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import PageHeader from "../../components/ui/PageHeader/PageHeader.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./Contacts.module.scss";

export default function Contacts() {
  const { t } = useLanguage();
  useDocumentTitle(t("contacts.title"));

  return (
    <>
      <PageHeader title={t("contacts.title")} intro={t("contacts.intro")} />
      <Container className={styles.content}>
        <div className={styles.info}>
          <ContactDetails />
          <OpeningHours />
        </div>

        <section className={styles.mapSection} aria-labelledby="map-title">
          <h2 id="map-title" className={styles.mapTitle}>
            {t("contacts.map")}
          </h2>
          <MapEmbed />
        </section>
      </Container>
    </>
  );
}
