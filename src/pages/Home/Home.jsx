import { Link } from "react-router-dom";
import Icon from "../../components/decor/Icon/Icon.jsx";
import Stamp from "../../components/decor/Stamp/Stamp.jsx";
import Wave from "../../components/decor/Wave/Wave.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Container from "../../components/ui/Container/Container.jsx";
import Picture from "../../components/ui/Picture/Picture.jsx";
import SectionHeading from "../../components/ui/SectionHeading/SectionHeading.jsx";
import { storyPhoto } from "../../data/gallery.js";
import { highlights } from "../../data/highlights.js";
import {
  eveningSteps,
  heroBackdrop,
  longTableFacts,
  longTablePhoto,
  photoStrip,
  seasonalProduce,
} from "../../data/home.js";
import { formatPeriods, getTodayHours, restaurant } from "../../data/restaurant.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import cx from "../../utils/cx.js";
import { formatPrice } from "../../utils/format.js";
import styles from "./Home.module.scss";

export default function Home() {
  const { t, pick, locale } = useLanguage();
  useDocumentTitle(t("meta.home"));
  const today = getTodayHours();
  const day = t("days")[today.day];
  const hours = formatPeriods(today.periods);

  return (
    <>
      {/* Hero: the dining room fills the screen; the headline sits on a cobalt panel. */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia}>
          <Picture
            className={styles.heroImage}
            photo={heroBackdrop}
            ratio={4 / 3}
            widths={[640, 1024, 1600, 2000]}
            sizes="100vw"
            priority
          />
        </div>
        <Container className={styles.heroInner}>
          <div className={styles.heroPanel}>
            <Stamp className={styles.heroStamp} text={t("home.stamp")} />
            <h1 id="hero-title" className={styles.heroTitle}>
              {t("home.heroTitle")}
            </h1>
            <p className={styles.heroLede}>{t("home.heroLede")}</p>
            <div className={styles.heroActions}>
              <Button to="/booking" variant="accent">
                {t("nav.book")}
              </Button>
              <Button to="/menu" variant="outline">
                {t("home.seeMenu")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <div className={styles.band}>
        <Container className={styles.bandInner}>
          <p>
            <Icon name="clock" className={styles.bandIcon} />
            {hours ? t("hours.openToday", { day, hours }) : t("hours.closedToday", { day })}
          </p>
          <p>
            <Icon name="pin" className={styles.bandIcon} />
            {restaurant.address.street}, {restaurant.address.city}
          </p>
          <p>
            <Icon name="phone" className={styles.bandIcon} />
            <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
          </p>
        </Container>
      </div>

      <section className={styles.story} aria-labelledby="story-title">
        <Container className={styles.storyInner}>
          <div className={styles.storyText}>
            <h2 id="story-title" className={styles.storyTitle}>
              {t("home.storyTitle")}
            </h2>
            <p>{t("home.storyP1")}</p>
            <p>{t("home.storyP2")}</p>
            <p>
              <Link to="/contacts">{t("home.storyLink")}</Link>
            </p>
          </div>
          <div className={styles.storyFrame}>
            <Picture
              photo={storyPhoto}
              ratio={4 / 5}
              widths={[360, 560, 800]}
              sizes="(min-width: 768px) 38vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className={styles.season} aria-labelledby="season-title">
        <Container>
          <SectionHeading id="season-title" title={t("home.seasonTitle")} intro={t("home.seasonIntro")} />
          <ul className={styles.seasonGrid}>
            {seasonalProduce.map((item) => (
              <li key={item.id} className={styles.seasonItem}>
                <span className={styles.seasonIcon}>
                  <Icon name={item.icon} size={28} />
                </span>
                <div>
                  <h3 className={styles.seasonName}>{pick(item.name)}</h3>
                  <p className={styles.seasonSource}>{pick(item.source)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={styles.dishes} aria-labelledby="dishes-title">
        <Container>
          <SectionHeading id="dishes-title" title={t("home.dishesTitle")} intro={t("home.dishesIntro")} />
          <ul className={styles.dishList}>
            {highlights.map((dish) => (
              <li key={dish.id}>
                <div className={styles.dishFrame}>
                  <Picture
                    photo={dish.photo}
                    ratio={4 / 5}
                    widths={[320, 480, 720]}
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                  <p className={styles.dishPrice}>
                    <span className="visually-hidden">{t("common.price")}</span>
                    {formatPrice(dish.price, locale)}
                  </p>
                </div>
                <h3 className={styles.dishName}>{pick(dish.name)}</h3>
                <p className={styles.dishText}>{pick(dish.description)}</p>
              </li>
            ))}
          </ul>
          <Button to="/menu" className={styles.dishesLink}>
            {t("home.fullMenu")}
          </Button>
        </Container>
      </section>

      <section className={styles.evening} aria-labelledby="evening-title">
        <Wave tone="cobalt" />
        <Container>
          <div className={styles.eveningHead}>
            <h2 id="evening-title" className={styles.eveningTitle}>
              {t("home.eveningTitle")}
            </h2>
            <p className={styles.eveningIntro}>{t("home.eveningIntro")}</p>
          </div>
          <ol className={styles.steps}>
            {eveningSteps.map((step, index) => (
              <li key={step.icon} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles.stepTitle}>
                  <Icon name={step.icon} size={22} className={styles.stepIcon} />
                  {pick(step.title)}
                </h3>
                <p className={styles.stepText}>{pick(step.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.strip} aria-labelledby="strip-title">
        <Container>
          <div className={styles.stripHead}>
            <h2 id="strip-title" className={styles.stripTitle}>
              {t("home.stripTitle")}
            </h2>
            <Link to="/gallery" className={styles.stripLink}>
              {t("home.allPhotos")}
            </Link>
          </div>
          <ul className={styles.stripGrid}>
            {photoStrip.map((photo) => (
              <li key={photo.id} className={cx(styles.stripItem, photo.wide && styles.stripWide)}>
                <Picture
                  className={styles.stripImage}
                  photo={photo}
                  ratio={photo.wide ? 3 / 2 : 4 / 5}
                  widths={photo.wide ? [480, 800, 1100] : [320, 480, 640]}
                  sizes={photo.wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={styles.long} aria-labelledby="long-title">
        <Container className={styles.longInner}>
          <div className={styles.longFrame}>
            <Picture
              photo={longTablePhoto}
              ratio={4 / 3}
              widths={[480, 800, 1100]}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 id="long-title" className={styles.longTitle}>
              {t("home.longTitle")}
            </h2>
            <p className={styles.longText}>{t("home.longText")}</p>
            <ul className={styles.facts}>
              {longTableFacts.map((fact) => (
                <li key={fact.icon} className={styles.fact}>
                  <Icon name={fact.icon} size={22} className={styles.factIcon} />
                  {pick(fact.text)}
                </li>
              ))}
            </ul>
            <div className={styles.longActions}>
              <Button href={restaurant.phone.href}>{t("home.longCall")}</Button>
              <Button href={`mailto:${restaurant.email}`} variant="outline">
                {t("home.longEmail")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <Wave tone="mustard" />
        <Container className={styles.ctaInner}>
          <div>
            <h2 id="cta-title" className={styles.ctaTitle}>
              {t("home.ctaTitle")}
            </h2>
            <p className={styles.ctaText}>{t("home.ctaText")}</p>
          </div>
          <div className={styles.ctaActions}>
            <Button to="/booking">{t("nav.book")}</Button>
            <Button href={restaurant.phone.href} variant="outline">
              {t("nav.call", { phone: restaurant.phone.display })}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
