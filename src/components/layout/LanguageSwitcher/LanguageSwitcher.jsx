import { languages, useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import styles from "./LanguageSwitcher.module.scss";

// Two-button switch between English and Ukrainian. The pressed button is the
// current language; each button is labelled in its own language.
export default function LanguageSwitcher({ className }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={cx(styles.switcher, className)} role="group" aria-label={t("language.label")}>
      {languages.map((option) => {
        const current = option.code === lang;
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            className={cx(styles.option, current && styles.current)}
            aria-pressed={current}
            aria-label={option.name}
            title={current ? option.name : t("language.switchTo", { name: option.name })}
            onClick={() => setLang(option.code)}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
