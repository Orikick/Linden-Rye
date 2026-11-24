import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import styles from "./SkipLink.module.scss";

// First focusable element on every page. Jumps keyboard users past the header.
export default function SkipLink({ targetId = "main" }) {
  const { t } = useLanguage();
  const handleClick = (event) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.scrollIntoView();
  };

  return (
    <a className={styles.skipLink} href={`#${targetId}`} onClick={handleClick}>
      {t("nav.skip")}
    </a>
  );
}
