import Button from "../../components/ui/Button/Button.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const { t } = useLanguage();
  useDocumentTitle(t("notFound.title"));

  return (
    <Container narrow className={styles.page}>
      <h1 className={styles.title}>{t("notFound.title")}</h1>
      <p className={styles.text}>{t("notFound.text")}</p>
      <div className={styles.actions}>
        <Button to="/">{t("notFound.home")}</Button>
        <Button to="/menu" variant="outline">
          {t("notFound.menu")}
        </Button>
      </div>
    </Container>
  );
}
