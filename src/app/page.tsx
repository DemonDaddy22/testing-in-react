import Products from './Module4/components/Products';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Products />
      </main>
    </div>
  );
}
