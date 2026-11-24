import Container from "../Container/Container.jsx";
import styles from "./PageHeader.module.scss";

// The h1 and opening line shared by every page except the home page.
export default function PageHeader({ title, intro, narrow = false }) {
  return (
    <header className={styles.header}>
      <Container narrow={narrow}>
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </Container>
    </header>
  );
}
