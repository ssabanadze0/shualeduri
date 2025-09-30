import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Interest-Based Ads</a>
      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} FakeStore. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
