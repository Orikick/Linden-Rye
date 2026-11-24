import { useLocation } from "react-router-dom";
import BookingSummary from "../../components/booking/BookingSummary/BookingSummary.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import PageHeader from "../../components/ui/PageHeader/PageHeader.jsx";
import StatusMessage from "../../components/ui/StatusMessage/StatusMessage.jsx";
import { restaurant } from "../../data/restaurant.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./BookingConfirmation.module.scss";

const isBooking = (value) =>
  Boolean(value) &&
  typeof value.reference === "string" &&
  typeof value.date === "string" &&
  typeof value.time === "string" &&
  typeof value.guests === "number";

export default function BookingConfirmation() {
  const { t } = useLanguage();
  // The booking arrives in router state from the form. It is not stored
  // anywhere else, so opening this address directly has nothing to show.
  const booking = useLocation().state?.booking;
  const confirmed = isBooking(booking);
  useDocumentTitle(confirmed ? t("confirmation.title") : t("confirmation.emptyTitle"));
  const phoneLink = <a href={restaurant.phone.href}>{restaurant.phone.display}</a>;

  if (!confirmed) {
    return (
      <Container narrow className={styles.empty}>
        <StatusMessage
          title={t("confirmation.emptyTitle")}
          as="h1"
          action={<Button to="/booking">{t("nav.book")}</Button>}
        >
          <p>
            {t("confirmation.emptyBody")} {phoneLink}
          </p>
        </StatusMessage>
      </Container>
    );
  }

  return (
    <>
      <PageHeader narrow title={t("confirmation.title")} intro={t("confirmation.thanks", { name: booking.name })} />
      <Container narrow className={styles.content}>
        <BookingSummary booking={booking} />

        <div className={styles.next}>
          <h2 className={styles.nextTitle}>{t("confirmation.beforeTitle")}</h2>
          <p>
            {t("confirmation.beforeText", { reference: booking.reference, street: restaurant.address.street })}{" "}
            {phoneLink}
          </p>
        </div>

        <div className={styles.actions}>
          <Button to="/menu">{t("confirmation.seeMenu")}</Button>
          <Button to="/contacts" variant="outline">
            {t("confirmation.findUs")}
          </Button>
        </div>
      </Container>
    </>
  );
}
