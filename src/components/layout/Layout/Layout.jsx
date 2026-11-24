import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import ErrorBoundary from "../../ui/ErrorBoundary/ErrorBoundary.jsx";
import Spinner from "../../ui/Spinner/Spinner.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import SkipLink from "../SkipLink/SkipLink.jsx";
import styles from "./Layout.module.scss";

export default function Layout() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <>
      <SkipLink targetId="main" />
      <ScrollToTop targetId="main" />
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        {/* Keyed by path so a failed page does not block the next one. */}
        <ErrorBoundary key={pathname}>
          <Suspense
            fallback={
              <div className={styles.loading}>
                <Spinner label={t("common.loadingPage")} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
