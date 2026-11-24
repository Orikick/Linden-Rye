import { useState } from "react";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import cx from "../../../utils/cx.js";
import Picture, { unsplashUrl } from "../../ui/Picture/Picture.jsx";
import StatusMessage from "../../ui/StatusMessage/StatusMessage.jsx";
import styles from "./GallerySlider.module.scss";

// Photo slider built on Swiper. Swipe, drag, use the arrow keys, the previous
// and next buttons, or pick a photo from the thumbnails underneath.
export default function GallerySlider({ photos = [] }) {
  const { t, pick, lang } = useLanguage();
  const [swiper, setSwiper] = useState(null);
  const [position, setPosition] = useState({ index: 0, isStart: true, isEnd: photos.length <= 1 });

  if (photos.length === 0) {
    return (
      <StatusMessage title={t("gallery.emptyTitle")}>
        <p>{t("gallery.emptyBody")}</p>
      </StatusMessage>
    );
  }

  const sync = (instance) => {
    setPosition({
      index: instance.activeIndex,
      isStart: instance.isBeginning,
      isEnd: instance.isEnd,
    });
  };

  return (
    <section className={styles.slider} aria-roledescription="carousel" aria-label={t("gallery.label")}>
      <Swiper
        key={lang}
        initialSlide={position.index}
        className={styles.stage}
        modules={[A11y, Keyboard]}
        slidesPerView={1}
        spaceBetween={16}
        keyboard={{ enabled: true }}
        a11y={{ slideLabelMessage: t("gallery.slide") }}
        onSwiper={(instance) => {
          setSwiper(instance);
          sync(instance);
        }}
        onSlideChange={sync}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <figure className={styles.figure}>
              <Picture
                photo={photo}
                ratio={3 / 2}
                widths={[480, 800, 1200]}
                sizes="(min-width: 1280px) 1120px, 100vw"
                priority={index === 0}
              />
              <figcaption className={styles.caption}>{pick(photo.caption)}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => swiper?.slidePrev()}
          disabled={position.isStart}
          aria-label={t("gallery.prev")}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <p className={styles.counter}>
          <span aria-hidden="true">
            {position.index + 1} / {photos.length}
          </span>
          <span className="visually-hidden">
            {t("gallery.counter", { index: position.index + 1, total: photos.length })}
          </span>
        </p>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => swiper?.slideNext()}
          disabled={position.isEnd}
          aria-label={t("gallery.next")}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <ul className={styles.thumbs} aria-label={t("gallery.choose")}>
        {photos.map((photo, index) => {
          const current = index === position.index;
          return (
            <li key={photo.id}>
              <button
                type="button"
                className={cx(styles.thumb, current && styles.current)}
                onClick={() => swiper?.slideTo(index)}
                aria-label={t("gallery.show", { index: index + 1, caption: pick(photo.caption) })}
                aria-current={current ? "true" : undefined}
              >
                <img
                  src={unsplashUrl(photo.id, 160, 1)}
                  alt=""
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
