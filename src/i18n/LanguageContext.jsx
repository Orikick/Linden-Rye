import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "./en.js";
import uk from "./uk.js";

export const languages = [
  { code: "en", short: "EN", name: "English", locale: "en-GB" },
  { code: "uk", short: "UA", name: "Українська", locale: "uk-UA" },
];

const dictionaries = { en, uk };
const STORAGE_KEY = "linden-rye-language";

// English unless the visitor has picked Ukrainian before (remembered in the browser).
function initialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dictionaries[saved]) return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Fall through.
  }
  return "en";
}

function lookup(dictionary, key) {
  return key.split(".").reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLanguage);
  const meta = languages.find((item) => item.code === lang) ?? languages[0];

  const setLang = useCallback((next) => {
    if (!dictionaries[next]) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not saved; the choice still applies for this visit.
    }
  }, []);

  // Keep the page's language attribute in step, so screen readers switch voice.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dictionary = dictionaries[lang];
    const plurals = new Intl.PluralRules(meta.locale);

    // t("menu.title") returns the string for the current language.
    // Entries can be functions of the variables, for plurals and inserted values:
    // t("menu.count", { count: 3 }).
    const t = (key, vars = {}) => {
      let entry = lookup(dictionary, key);
      if (entry === undefined) entry = lookup(en, key);
      if (entry === undefined) return key;
      if (typeof entry === "function") return entry({ ...vars, plural: (n, forms) => forms[plurals.select(n)] ?? forms.other });
      return entry;
    };

    // Picks the right language from a { en, uk } pair in the data files.
    const pick = (field) => {
      if (field == null || typeof field !== "object") return field;
      return field[lang] ?? field.en;
    };

    return { lang, setLang, locale: meta.locale, t, pick };
  }, [lang, meta.locale, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export default LanguageContext;
