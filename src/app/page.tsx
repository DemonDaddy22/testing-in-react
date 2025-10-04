import Module3 from '@/Module3/components/Module3';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Module3 />
      </main>
    </div>
  );
}
