import { useNavigate } from "react-router-dom";
import BookingForm from "../../components/booking/BookingForm/BookingForm.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import PageHeader from "../../components/ui/PageHeader/PageHeader.jsx";
import { restaurant } from "../../data/restaurant.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./Booking.module.scss";

export default function Booking() {
  const { t } = useLanguage();
  useDocumentTitle(t("booking.title"));
  const navigate = useNavigate();

  const handleBooked = (booking) => {
    navigate("/booking/confirmation", { state: { booking } });
  };

  return (
    <>
      <PageHeader title={t("booking.title")} intro={t("booking.intro")} />
      <Container className={styles.layout}>
        <BookingForm onBooked={handleBooked} />

        <aside className={styles.aside} aria-labelledby="booking-notes-title">
          <h2 id="booking-notes-title" className={styles.asideTitle}>
            {t("booking.asideTitle")}
          </h2>
          <ul className={styles.notes}>
            {t("booking.notes").map((note) => (
              <li key={note}>{note}</li>
            ))}
            <li>
              {t("booking.notesCall")} <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
            </li>
          </ul>
        </aside>
      </Container>
    </>
  );
}
