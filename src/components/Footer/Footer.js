import styles from './Footer.module.css';

export default function Footer({ creator, link }) {
  return (
    <footer className={styles.Footer}>
      <p>
        Created by:&nbsp;
        <a 
          style={styles.a}
          target='_blank'
          rel='noopener noreferrer'
          href={link}
        >
          {creator}
        </a>
      </p>
    </footer>
  );
};
