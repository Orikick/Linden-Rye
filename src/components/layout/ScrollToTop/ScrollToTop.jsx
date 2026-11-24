import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// On every page change, scroll to the top and move focus to the main region
// so keyboard and screen reader users start from the new page's content.
export default function ScrollToTop({ targetId = "main" }) {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    window.scrollTo(0, 0);
    document.getElementById(targetId)?.focus({ preventScroll: true });
  }, [pathname, targetId]);

  return null;
}
