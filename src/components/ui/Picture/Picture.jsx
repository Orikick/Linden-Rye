import { useState } from "react";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import styles from "./Picture.module.scss";

const UNSPLASH = "https://images.unsplash.com/photo-";

// Asks Unsplash for a crop at exactly the size and shape the layout needs.
export function unsplashUrl(id, width, ratio) {
  const height = Math.round(width / ratio);
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=70`;
}

// Responsive photo with a fixed aspect ratio, so the page does not shift while it loads.
// photo: { id, alt } where alt is { en, uk }. ratio is width / height. `priority` is for the one image
// that is visible first; every other image loads lazily.
// If the image fails to load, a neutral placeholder with the same shape is shown.
export default function Picture({
  photo,
  ratio = 4 / 3,
  widths = [360, 640, 960],
  sizes = "100vw",
  priority = false,
  className,
}) {
  const [failed, setFailed] = useState(false);
  const { t, pick } = useLanguage();
  const alt = pick(photo.alt);

  if (failed) {
    return (
      <div
        className={cx(styles.fallback, className)}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden="true">{t("gallery.unavailable")}</span>
      </div>
    );
  }

  const largest = widths[widths.length - 1];

  return (
    <img
      className={cx(styles.image, className)}
      style={{ aspectRatio: ratio }}
      src={unsplashUrl(photo.id, largest, ratio)}
      srcSet={widths.map((width) => `${unsplashUrl(photo.id, width, ratio)} ${width}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round(largest / ratio)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
