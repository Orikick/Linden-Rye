import { useRef } from "react";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import styles from "./MenuTabs.module.scss";

export const tabId = (categoryId) => `menu-tab-${categoryId}`;
export const panelId = (categoryId) => `menu-panel-${categoryId}`;

// Category tabs following the WAI-ARIA tabs pattern: one tab stop,
// arrow keys move between tabs, Home and End jump to the first and last.
// `counts` maps category id to the number of dishes that pass the filter.
export default function MenuTabs({ categories, counts = {}, activeId, onChange }) {
  const { t, pick } = useLanguage();
  const tabRefs = useRef({});

  const select = (index) => {
    const category = categories[(index + categories.length) % categories.length];
    onChange(category.id);
    tabRefs.current[category.id]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const keys = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: categories.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key]);
  };

  return (
    <div className={styles.scroller}>
      <div className={styles.tabs} role="tablist" aria-label={t("menu.categories")}>
        {categories.map((category, index) => {
          const selected = category.id === activeId;
          const count = counts[category.id] ?? category.items.length;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[category.id] = node;
              }}
              type="button"
              role="tab"
              id={tabId(category.id)}
              aria-selected={selected}
              aria-controls={panelId(category.id)}
              tabIndex={selected ? 0 : -1}
              className={cx(styles.tab, selected && styles.selected, count === 0 && styles.empty)}
              onClick={() => onChange(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {pick(category.label)}
              <span className={styles.count} aria-hidden="true">
                {count}
              </span>
              <span className="visually-hidden">, {t("menu.tabCount", { count })}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
