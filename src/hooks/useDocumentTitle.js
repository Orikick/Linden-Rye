import { useEffect } from "react";

const SITE = "Linden & Rye";

// Sets the browser tab title for a page, e.g. "Menu | Linden & Rye".
// Pass the already translated title; it updates when the language changes.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | ${SITE}`;
  }, [title]);
}
