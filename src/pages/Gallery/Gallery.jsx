import GallerySlider from "../../components/gallery/GallerySlider/GallerySlider.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import PageHeader from "../../components/ui/PageHeader/PageHeader.jsx";
import { galleryPhotos } from "../../data/gallery.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./Gallery.module.scss";

export default function Gallery() {
  const { t } = useLanguage();
  useDocumentTitle(t("gallery.title"));

  return (
    <>
      <PageHeader title={t("gallery.title")} intro={t("gallery.intro")} />
      <Container className={styles.content}>
        <GallerySlider photos={galleryPhotos} />

        <div className={styles.next}>
          <p>{t("gallery.cta")}</p>
          <Button to="/booking">{t("nav.book")}</Button>
        </div>
      </Container>
    </>
  );
}
