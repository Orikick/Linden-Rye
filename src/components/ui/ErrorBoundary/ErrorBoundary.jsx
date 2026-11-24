import { Component } from "react";
import LanguageContext from "../../../i18n/LanguageContext.jsx";
import Button from "../Button/Button.jsx";
import Container from "../Container/Container.jsx";
import StatusMessage from "../StatusMessage/StatusMessage.jsx";
import styles from "./ErrorBoundary.module.scss";

// Catches a page that fails to load or render (for example, a lost connection
// while fetching its code) and offers a way forward instead of a blank screen.
export default class ErrorBoundary extends Component {
  static contextType = LanguageContext;

  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { t } = this.context;

    return (
      <Container narrow className={styles.wrap}>
        <StatusMessage
          tone="error"
          title={t("pageError.title")}
          as="h1"
          action={
            <>
              <Button onClick={() => window.location.reload()}>{t("pageError.reload")}</Button>
              <Button href="/" variant="outline">
                {t("pageError.home")}
              </Button>
            </>
          }
        >
          <p>{t("pageError.text")}</p>
        </StatusMessage>
      </Container>
    );
  }
}
