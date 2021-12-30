import styles from './Header.module.css';

export default function Header({title}) {
  return (
    <header className={styles.Header}>
      <h1>{title}</h1>
    </header>
  );
};
