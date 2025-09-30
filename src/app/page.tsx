import HelloUsername from '@/Module1/components/HelloUsername';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HelloUsername name='Rohan' />
      </main>
    </div>
  );
}
