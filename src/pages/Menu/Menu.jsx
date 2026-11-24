import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MenuList from "../../components/menu/MenuList/MenuList.jsx";
import MenuSkeleton from "../../components/menu/MenuSkeleton/MenuSkeleton.jsx";
import MenuTabs, { panelId, tabId } from "../../components/menu/MenuTabs/MenuTabs.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import ChoiceChips from "../../components/ui/ChoiceChips/ChoiceChips.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import PageHeader from "../../components/ui/PageHeader/PageHeader.jsx";
import StatusMessage from "../../components/ui/StatusMessage/StatusMessage.jsx";
import { dietFilters } from "../../data/dietaryTags.js";
import { restaurant } from "../../data/restaurant.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import useMenu from "../../hooks/useMenu.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import styles from "./Menu.module.scss";

export default function Menu() {
  const { t } = useLanguage();
  useDocumentTitle(t("menu.title"));
  const { status, data, retry } = useMenu();

  return (
    <>
      <PageHeader title={t("menu.title")} intro={t("menu.intro")} />

      {status === "loading" && (
        <Container className={styles.content}>
          <MenuSkeleton />
        </Container>
      )}

      {status === "error" && (
        <Container className={styles.content}>
          <StatusMessage
            tone="error"
            title={t("menu.errorTitle")}
            action={<Button onClick={retry}>{t("menu.retry")}</Button>}
          >
            <p>
              {t("menu.errorBody")} <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
            </p>
          </StatusMessage>
        </Container>
      )}

      {status === "success" &&
        (data.categories.length === 0 ? (
          <Container className={styles.content}>
            <StatusMessage title={t("menu.emptyTitle")} action={<Button to="/contacts">{t("menu.emptyAction")}</Button>}>
              <p>{t("menu.emptyBody")}</p>
            </StatusMessage>
          </Container>
        ) : (
          <MenuBrowser categories={data.categories} />
        ))}
    </>
  );
}

function MenuBrowser({ categories }) {
  const { t, pick } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [diet, setDiet] = useState("all");
  const toolbarRef = useRef(null);
  const panelRef = useRef(null);

  // The open category lives in the URL (?category=mains) so it can be linked and survives a refresh.
  const requested = searchParams.get("category");
  const active = categories.find((category) => category.id === requested) ?? categories[0];

  const filter = dietFilters.find((option) => option.value === diet) ?? dietFilters[0];
  const matches = (item) => filter.matches(item.tags ?? []);
  const items = active.items.filter(matches);
  const counts = Object.fromEntries(
    categories.map((category) => [category.id, category.items.filter(matches).length]),
  );
  const categoryName = pick(active.label);
  const filterName = t(`menu.filters.${filter.value}`);

  // When the toolbar is stuck and the reader is partway down a list, bring the
  // start of the new list back into view after changing category or filter.
  const revealPanel = () => {
    requestAnimationFrame(() => {
      const toolbar = toolbarRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!toolbar || !panel) return;
      const gap = 16;
      if (panel.top < toolbar.bottom + gap) {
        window.scrollBy({ top: panel.top - toolbar.bottom - gap });
      }
    });
  };

  const selectCategory = (id) => {
    setSearchParams({ category: id }, { replace: true, preventScrollReset: true });
    revealPanel();
  };

  const selectDiet = (value) => {
    setDiet(value);
    revealPanel();
  };

  return (
    <>
      <div ref={toolbarRef} className={styles.toolbar}>
        <Container className={styles.toolbarInner}>
          <MenuTabs categories={categories} counts={counts} activeId={active.id} onChange={selectCategory} />
          <ChoiceChips
            className={styles.filter}
            legend={t("menu.filterLegend")}
            hideLegend
            compact
            name="diet"
            options={dietFilters.map((option) => ({ value: option.value, label: t(`menu.filters.${option.value}`) }))}
            value={diet}
            onChange={selectDiet}
          />
        </Container>
      </div>

      <Container className={styles.content}>
        <section
          ref={panelRef}
          role="tabpanel"
          id={panelId(active.id)}
          aria-labelledby={tabId(active.id)}
          tabIndex={0}
          className={styles.panel}
        >
          <h2 className="visually-hidden">{categoryName}</h2>
          <div className={styles.panelHead}>
            {active.note && <p className={styles.note}>{pick(active.note)}</p>}
            <p className={styles.count} role="status">
              {t("menu.count", { shown: items.length, total: active.items.length, category: categoryName })}
            </p>
          </div>

          {items.length > 0 ? (
            <MenuList items={items} />
          ) : (
            <StatusMessage
              title={t("menu.noMatchTitle", { filter: filterName, category: categoryName })}
              as="h3"
              action={
                <Button variant="outline" onClick={() => selectDiet("all")}>
                  {t("menu.showAll")}
                </Button>
              }
            >
              <p>{t("menu.noMatchBody")}</p>
            </StatusMessage>
          )}
        </section>

        <p className={styles.footnote}>{t("menu.footnote")}</p>
      </Container>
    </>
  );
}
